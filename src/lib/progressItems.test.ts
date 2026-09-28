import { describe, expect, it } from "vitest";
import { parseProgressItems } from "./progressItems";
import shipping from "~/data/shipping.json";

describe("parseProgressItems", () => {
  it("keeps valid items in order", () => {
    const items = parseProgressItems([
      { title: "Rebuild 1", status: "done", href: "/gatherings/" },
      { title: "Whitepaper", status: "in-progress", note: "Draft in review" },
      { title: "Rebuild 3", status: "planned", image: "https://example.com/a.webp", imageAlt: "Paris" },
    ]);
    expect(items.map((i) => i.title)).toEqual(["Rebuild 1", "Whitepaper", "Rebuild 3"]);
    expect(items[1].note).toBe("Draft in review");
  });

  it("accepts a brand color and rejects anything else", () => {
    expect(parseProgressItems([{ title: "X", status: "done", color: "blush" }])[0].color).toBe("blush");
    expect(() => parseProgressItems([{ title: "X", status: "done", color: "purple" }])).toThrow(/color "purple"/);
    expect(() => parseProgressItems([{ title: "X", status: "done", color: "blue-light" }])).toThrow(/color "blue-light"/);
  });

  it("rejects an unknown status", () => {
    expect(() => parseProgressItems([{ title: "X", status: "shipped" }])).toThrow(/status "shipped"/);
  });

  it("rejects unknown fields, such as a percentage or a typo", () => {
    expect(() => parseProgressItems([{ title: "X", status: "done", percent: 80 }])).toThrow(/unknown field "percent"/);
    expect(() => parseProgressItems([{ title: "X", stauts: "done" }])).toThrow(/unknown field "stauts"/);
  });

  it("rejects a missing title and empty optional fields", () => {
    expect(() => parseProgressItems([{ status: "done" }])).toThrow(/needs a title/);
    expect(() => parseProgressItems([{ title: "X", status: "done", note: " " }])).toThrow(/"note"/);
  });

  it("rejects links that aren't a path or https URL", () => {
    expect(() => parseProgressItems([{ title: "X", status: "done", href: "gatherings" }])).toThrow(/"href"/);
    expect(() => parseProgressItems([{ title: "X", status: "done", href: "http://a.eu" }])).toThrow(/"href"/);
  });

  it("rejects input that isn't an array of objects", () => {
    expect(() => parseProgressItems({})).toThrow(/array/);
    expect(() => parseProgressItems(["X"])).toThrow(/object/);
  });
});

describe("src/data/shipping.json", () => {
  it("is valid progress content", () => {
    expect(() => parseProgressItems(shipping)).not.toThrow();
  });
});
