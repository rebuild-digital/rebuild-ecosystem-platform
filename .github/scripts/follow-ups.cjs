// Turns "follow-up" bullets in a merged PR's description into issues.
// Used by .github/workflows/follow-up-issues.yml; see AGENTS.md → Workflow.

// Headings (markdown `#` or a bold line) that start a follow-up section.
const SECTION =
  /(follow[- ]?ups?|not in (this|the) pr|saved for later|out of scope|left for later|next steps|todo later)/i;

const BULLET = /^\s{0,3}[-*+]\s+(?:\[[ xX]\]\s+)?(.+)$/;
const HEADING = /^\s{0,3}(#{1,6}\s+.+|\*\*[^*]+\*\*:?\s*)$/;
const ISSUE_REF = /(^|[\s(])#\d+\b|\/(issues|pull)\/\d+/;

/** Returns the top-level bullets under follow-up headings. */
function extractFollowUps(body) {
  const items = [];
  let inSection = false;
  for (const line of (body || "").split(/\r?\n/)) {
    if (HEADING.test(line)) {
      inSection = SECTION.test(line);
      continue;
    }
    if (!inSection) continue;
    // Only top-level bullets; nested bullets are details of their parent.
    if (/^\s{2,}/.test(line)) continue;
    const m = line.match(BULLET);
    if (m) items.push(m[1].trim());
  }
  return items;
}

/** Bullets already linked to an issue or PR (e.g. "(#42)") are done. */
function isTracked(item) {
  return ISSUE_REF.test(item);
}

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[`*_~[\]()<>"'.,:;!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Plain-text issue title from a bullet, capped at 100 characters. */
function toTitle(item) {
  const t = item
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // markdown links → text
    .replace(/\*\*|__/g, "")
    .trim();
  return t.length > 100 ? `${t.slice(0, 97).trimEnd()}…` : t;
}

/** True if an open issue already covers this item (same or containing title). */
function findExisting(item, openIssues) {
  const want = normalize(toTitle(item));
  return openIssues.find((issue) => {
    const have = normalize(issue.title);
    return have === want || have.includes(want) || want.includes(have);
  });
}

async function run({ github, context, core }) {
  const pr = context.payload.pull_request;
  const items = extractFollowUps(pr.body).filter((i) => !isTracked(i));
  if (items.length === 0) {
    core.info("No untracked follow-ups.");
    return;
  }

  const { owner, repo } = context.repo;
  const openIssues = (
    await github.paginate(github.rest.issues.listForRepo, {
      owner,
      repo,
      state: "open",
      per_page: 100,
    })
  ).filter((i) => !i.pull_request);

  const created = [];
  const existing = [];
  for (const item of items) {
    const match = findExisting(item, openIssues);
    if (match) {
      existing.push(`- ${toTitle(item)} → #${match.number}`);
      continue;
    }
    const { data: issue } = await github.rest.issues.create({
      owner,
      repo,
      title: toTitle(item),
      labels: ["follow-up"],
      body: [
        `Follow-up from #${pr.number} (${pr.title}), listed as not in that PR:`,
        "",
        `> ${item}`,
        "",
        "Created automatically when the PR merged. Add context before picking it up.",
      ].join("\n"),
    });
    openIssues.push(issue);
    created.push(`- #${issue.number} ${issue.title}`);
  }

  const lines = ["**Follow-ups tracked**"];
  if (created.length) lines.push("", "Created:", ...created);
  if (existing.length) lines.push("", "Already open:", ...existing);
  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: pr.number,
    body: lines.join("\n"),
  });
}

module.exports = { run, extractFollowUps, isTracked, toTitle, findExisting };
