// Pure helpers for the directory's once-a-day shuffle. Kept out of the
// "use server" data module so they can be unit-tested.

export function dailySeed(date: Date = new Date()): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffles exactly once from a canonical (id-sorted) order, so a given day
// always gives one order no matter what order the input arrives in.
export function dailyOrder<T extends { id: string }>(
  items: T[],
  date: Date = new Date(),
): T[] {
  const canonical = [...items].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return seededShuffle(canonical, dailySeed(date));
}
