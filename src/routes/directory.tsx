import { Title, Meta } from "@solidjs/meta";
import { createAsync, cache } from "@solidjs/router";
import { createSignal, createMemo, Suspense, For, Show } from "solid-js";
import { getBuilders } from "~/data/builders";

const getDirectoryData = cache(async () => {
  "use server";
  const builders = await getBuilders();
  return builders.map((b) => ({
    id: b.id,
    name: b.name,
    link: b.link,
    category: b.category,
  }));
}, "directory-data");

export const route = {
  load: () => getDirectoryData(),
};

export default function Directory() {
  const data = createAsync(() => getDirectoryData());
  const [activeCategories, setActiveCategories] = createSignal<string[]>([]);

  const allCategories = createMemo(() => {
    const cats = new Set<string>();
    for (const b of data() ?? []) {
      for (const c of b.category) cats.add(c);
    }
    return [...cats].sort();
  });

  const filtered = createMemo(() => {
    const active = activeCategories();
    const all = data() ?? [];
    if (active.length === 0) return all;
    return all.filter((b) => b.category.some((c) => active.includes(c)));
  });

  function toggleCategory(cat: string) {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function clearFilters() {
    setActiveCategories([]);
  }

  return (
    <>
      <Title>Directory — Rebuild</Title>
      <Meta
        name="description"
        content="European social platform directory. Browse and filter platforms by category."
      />

      <h1 class="text-4xl md:text-5xl font-normal text-dark mb-md">
        Social Platform Directory
      </h1>
      <p class="text-darker mb-xl">
        {filtered().length} platform{filtered().length !== 1 ? "s" : ""}
        <Show when={activeCategories().length > 0}>
          {" "}
          (of {(data() ?? []).length} total)
        </Show>
      </p>

      <Suspense>
        <Show when={allCategories().length > 0}>
          <div id="category-filters-wrapper" class="mb-2xl">
            <div id="category-filters" class="flex flex-wrap gap-xs">
              <For each={allCategories()}>
                {(cat) => (
                  <button
                    class="filter-button"
                    classList={{
                      "bg-dark! text-light!": activeCategories().includes(cat),
                    }}
                    onClick={() => toggleCategory(cat)}
                    aria-pressed={activeCategories().includes(cat)}
                  >
                    {cat}
                    <Show when={activeCategories().includes(cat)}>
                      <span class="filter-x" aria-hidden="true">
                        ×
                      </span>
                    </Show>
                  </button>
                )}
              </For>
              <Show when={activeCategories().length > 0}>
                <button
                  class="filter-button border-transparent! text-darker hover:text-dark"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              </Show>
            </div>
          </div>
        </Show>

        <div class="space-y-0">
          <For each={filtered()}>
            {(builder) => (
              <div class="flex flex-col md:flex-row md:items-center md:justify-between border-b border-dark py-sm">
                <h2 class="text-2xl md:text-4xl font-normal text-dark mb-0">
                  <Show
                    when={builder.link}
                    fallback={<span>{builder.name}</span>}
                  >
                    <a
                      href={builder.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hover:underline transition-fast break-all"
                    >
                      {builder.name}
                    </a>
                  </Show>
                </h2>
                <div class="flex flex-wrap md:justify-end gap-xs">
                  <For each={builder.category}>
                    {(cat, i) => (
                      <span class="text-sm text-dark">
                        {cat}
                        {i() < builder.category.length - 1 ? ", " : ""}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>
        </div>

        <Show when={filtered().length === 0 && (data() ?? []).length > 0}>
          <p class="text-lg text-darker py-xl">
            No platforms match the selected filters.
          </p>
        </Show>

        <Show when={(data() ?? []).length === 0}>
          <p class="text-lg text-darker py-xl">
            Directory data is currently unavailable.
          </p>
        </Show>
      </Suspense>

      <div class="mt-xl md:mt-3xl flex flex-col md:flex-row justify-end items-start md:items-center gap-lg pb-3xl">
        <div class="flex gap-sm md:gap-md">
          <button
            data-form="builder-application"
            class="inline-block px-sm md:px-lg py-xs md:py-md bg-dark border-2 border-dark text-light hover:underline transition-all duration-fast cursor-pointer"
          >
            Join the directory
          </button>
          <button
            data-form="builder-promo"
            class="inline-block px-sm md:px-lg py-xs md:py-md bg-transparent border-2 border-dark text-dark hover:underline transition-all duration-fast cursor-pointer"
          >
            Suggest a platform
          </button>
        </div>
      </div>
    </>
  );
}
