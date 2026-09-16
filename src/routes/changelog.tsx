import { Title, Meta } from "@solidjs/meta";

export default function Changelog() {
  return (
    <>
      <Title>Changelog | Rebuild</Title>
      <Meta
        name="description"
        content="The digital platform changelog, where we keep you up to date about what we're improving."
      />

      <div class="mx-auto max-w-[75ch]">
        <section class="pt-xl">
          <header class="mb-xl w-full">
            <h1 class="font-normal text-4xl">Changelog</h1>
          </header>
        </section>

        <section class="pb-6xl">
          <div class="rich-text">
            <h4>v1.0.1 - April 29, 2026</h4>
            <ul>
              <li>New /gathering page and subpages</li>
              <li>Improved form handling and differentiation</li>
              <li>Quote carousel component</li>
              <li>Simplified footer</li>
              <li>Exit "beta" state</li>
            </ul>

            <h4>v0.9.87 - January 22, 2026</h4>
            <ul>
              <li>New callout for Rebuild 1 on the landing page</li>
              <li>Random ordering on the directory entries</li>
              <li>Subtle pulse animation on our beta tag in the header</li>
            </ul>

            <h4>v0.9.7 - January 12, 2026</h4>
            <ul>
              <li>
                Update to the directory in order to support the growing number of
                platforms in it! The directory now has...
              </li>
              <li>
                Category filters, allowing you to view only a single, or
                multiple categories.
              </li>
              <li>Consistent tag coloring</li>
              <li>Tooltip with explanation</li>
              <li>Three column masonry grid on desktop</li>
              <li>More compact and scannable design</li>
              <li>Also, fixed typos across several pages.</li>
            </ul>

            <h4>v0.9.6 - December 21, 2025</h4>
            <ul>
              <li>
                Newsletter checkboxes now sign you up directly to our service
                (instead of manual imports).
              </li>
              <li>
                Loads of form simplifications, both UX, copy and backend.
              </li>
              <li>General form styling consistency.</li>
              <li>
                Also, rolled back the versions on the changelog to v0.9 ... it's
                beta, after all.
              </li>
            </ul>

            <h4>v0.9.5 - December 18, 2025</h4>
            <ul>
              <li>added open positions page, incl. in footer</li>
              <li>added student positions</li>
            </ul>

            <h4>v0.9.4 - December 17, 2025</h4>
            <ul>
              <li>styling upgrades for insights on mobile</li>
              <li>final edits to daniela story</li>
            </ul>

            <h4>v0.9.3 - December 17, 2025</h4>
            <ul>
              <li>Added changelog</li>
              <li>Removed demo pages</li>
              <li>Update DN story</li>
              <li>initial jobs page work</li>
            </ul>

            <h4>v0.9.2 - December 16, 2025</h4>
            <ul>
              <li>individual subpages for all forms + improved language</li>
              <li>remove featured property from posts</li>
              <li>added TMM post and true masonry insights</li>
              <li>better spacing in insights grid</li>
              <li>updated positioning in site description</li>
              <li>typos on homepage and journey.</li>
              <li>Also MV was listed twice as a Keynote speaker!</li>
            </ul>

            <h4>v0.9.1 - December 16, 2025</h4>
            <ul>
              <li>Lots of small fixes</li>
              <li>
                Updated taxonomy to say "social marketplaces", consistency is
                king
              </li>
              <li>no more authors in the insights feed for now</li>
              <li>... but image credits on /about images</li>
            </ul>

            <h4>v0.9.0 - December 15, 2025</h4>
            <ul>
              <li>Initial launch. What a day.</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
