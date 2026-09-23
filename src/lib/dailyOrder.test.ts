import { describe, expect, it } from "vitest";
import { dailyOrder, dailySeed, seededShuffle } from "./dailyOrder";

const items = Array.from({ length: 50 }, (_, i) => ({
  id: `id-${String(i).padStart(2, "0")}`,
}));
const ids = (list: { id: string }[]) => list.map((x) => x.id);

const day = new Date(2026, 8, 23, 9, 0);
const sameDayLater = new Date(2026, 8, 23, 23, 59);
const nextDay = new Date(2026, 8, 24, 0, 1);

describe("dailySeed", () => {
  it("encodes the local date as YYYYMMDD", () => {
    expect(dailySeed(day)).toBe(20260923);
  });
});

describe("seededShuffle", () => {
  it("returns a permutation and leaves the input untouched", () => {
    const input = [...items];
    const out = seededShuffle(input, 42);
    expect(input).toEqual(items);
    expect(ids(out).sort()).toEqual(ids(items));
  });
});

describe("dailyOrder", () => {
  it("gives the same order for the same day whatever the input order", () => {
    const reversed = [...items].reverse();
    const alreadyShuffled = seededShuffle(items, dailySeed(day));
    const expected = ids(dailyOrder(items, day));

    expect(ids(dailyOrder(reversed, day))).toEqual(expected);
    // A cache file written by the old code was stored pre-shuffled.
    expect(ids(dailyOrder(alreadyShuffled, day))).toEqual(expected);
    expect(ids(dailyOrder(items, sameDayLater))).toEqual(expected);
  });

  it("is stable when applied to its own output", () => {
    const once = dailyOrder(items, day);
    expect(ids(dailyOrder(once, day))).toEqual(ids(once));
  });

  it("changes the order on a new day", () => {
    expect(ids(dailyOrder(items, nextDay))).not.toEqual(ids(dailyOrder(items, day)));
  });
});
