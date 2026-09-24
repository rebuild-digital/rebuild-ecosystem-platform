import { describe, expect, it } from "vitest";
import { mapPage, slugify } from "./notion";
import { page } from "./testPages";

describe("slugify", () => {
  it("makes URL-safe slugs from platform names", () => {
    expect(slugify("Mastodon")).toBe("mastodon");
    expect(slugify("Arter.dk")).toBe("arter-dk");
    expect(slugify("Pixelfed & Friends!")).toBe("pixelfed-and-friends");
    expect(slugify("Żółć Café")).toBe("zolc-cafe");
    expect(slugify("Grøn Æble")).toBe("gron-aeble");
    expect(slugify("  ---  ")).toBe("platform");
  });
});

describe("mapPage", () => {
  const mapped = mapPage(
    page("n1", {
      name: "Example",
      published: true,
      description: "A platform",
      website: "https://example.org",
      countries: ["Norway", "Ukraine"],
      categories: ["Messaging", "Video"],
      priority: "Save 4 Later",
      stage: "Shut down",
      foundingYear: 2019,
      contactName: "Contact",
      contactInfo: "contact@example.org",
      notes: "note",
      logo: { type: "file", url: "https://notion.example/logo.png" },
      capitalRaised: 250000,
      investors: "Fund A",
    }),
  );

  it("maps columns and enums", () => {
    expect(mapped).toMatchObject({
      notionId: "n1",
      name: "Example",
      status: "published",
      priority: "save_for_later",
      stage: "shut_down",
      foundingYear: 2019,
      contactInfo: "contact@example.org",
      publishDate: "2025-01-15",
      categories: ["Messaging", "Video"],
      logo: { url: "https://notion.example/logo.png", hosted: "notion" },
      warnings: [],
    });
  });

  it("keeps the first country and reports the rest", () => {
    expect(mapped.country).toBe("Norway");
    expect(mapped.droppedCountries).toEqual(["Ukraine"]);
  });

  it("puts unmapped, non-empty properties into enrichment", () => {
    expect(mapped.enrichment).toEqual({ "Total Capital Raised": 250000, Investors: "Fund A" });
  });

  it("defaults empty rows to draft with no enrichment", () => {
    const empty = mapPage(page("n2", {}));
    expect(empty).toMatchObject({ name: "Untitled", status: "draft", country: null, enrichment: null, logo: null });
  });

  it("warns about select options it doesn't know", () => {
    expect(mapPage(page("n3", { priority: "Someday" })).warnings).toEqual(['unknown PRIORITY "Someday"']);
  });
});
