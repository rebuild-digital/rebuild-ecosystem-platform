import { createSignal, createEffect, onMount, onCleanup, For, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
import site from "~/data/site";

export default function Header(props: { solid?: boolean }) {
  const [mobileOpen, setMobileOpen] = createSignal(false);
  const [scrolledPastHero, setScrolledPastHero] = createSignal(false);
  const [kbOpenDropdown, setKbOpenDropdown] = createSignal<number | null>(null);
  const location = useLocation();

  const isHome = () => location.pathname === "/";
  const isTransparent = () => isHome() && !scrolledPastHero() && !props.solid;

  onMount(() => {
    const header = document.querySelector("header") as HTMLElement | null;
    if (!header) return;

    // Hero is h-[90vh]; use viewport height as threshold so this works
    // even if the hero element isn't in the DOM yet (e.g. inside Suspense).
    function handleScroll() {
      const heroHeight = window.innerHeight * 0.9;
      setScrolledPastHero(window.scrollY + header!.offsetHeight >= heroHeight);
    }

    // Suppress initial transition to avoid FOUC
    header.style.transition = "none";
    handleScroll();
    header.offsetHeight; // force reflow
    requestAnimationFrame(() => {
      header.style.transition = "";
    });

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onCleanup(() => window.removeEventListener("scroll", onScroll));
  });

  createEffect(() => {
    if (!mobileOpen()) return;
    document.body.style.overflow = "hidden";
    onCleanup(() => {
      document.body.style.overflow = "";
    });
  });

  return (
    <header
      class="fixed z-50 w-full top-0 left-0 pt-md"
      classList={{ transparent: isTransparent() }}
    >
      <div class="container max-w-max-width mx-auto px-md">
        <div class="h-16 flex justify-between items-center gap-lg md:gap-sm border-b-2 pb-md">
          <div class="flex gap-sm">
            <div class="w-auto self-center">
              <a href="/">
                <img
                  class="logo-dark h-6 w-auto"
                  src={site.logo}
                  alt="Rebuild logo."
                  width="120"
                  height="24"
                />
                <img
                  class="logo-white h-6 w-auto"
                  src={site.logoWhite}
                  alt="Rebuild logo."
                  width="120"
                  height="24"
                />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" class="hidden lg:block">
            <ul class="flex gap-md list-none md:flex-wrap md:justify-center md:gap-sm">
              <For each={site.main_navigation}>
                {(item, itemIndex) => {
                  const hasSubmenu = !!item.subItems;

                  function handleTriggerKeydown(e: KeyboardEvent) {
                    if (!hasSubmenu) return;
                    if (e.key === "ArrowDown" || e.key === "Enter") {
                      e.preventDefault();
                      setKbOpenDropdown(itemIndex());
                      // Focus the first focusable submenu item after the menu renders
                      requestAnimationFrame(() => {
                        const li = (e.currentTarget as HTMLElement).closest("li");
                        const firstLink = li?.querySelector<HTMLElement>(
                          'ul[role="menu"] a[role="menuitem"]'
                        );
                        firstLink?.focus();
                      });
                    }
                  }

                  function handleSubmenuKeydown(e: KeyboardEvent) {
                    const menu = (e.currentTarget as HTMLElement).closest(
                      'ul[role="menu"]'
                    );
                    if (!menu) return;

                    const items = Array.from(
                      menu.querySelectorAll<HTMLElement>('a[role="menuitem"]')
                    );
                    const currentIdx = items.indexOf(
                      document.activeElement as HTMLElement
                    );

                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      const next = currentIdx + 1 < items.length ? currentIdx + 1 : 0;
                      items[next]?.focus();
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      const prev = currentIdx - 1 >= 0 ? currentIdx - 1 : items.length - 1;
                      items[prev]?.focus();
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      setKbOpenDropdown(null);
                      // Return focus to the trigger link
                      const li = menu.closest("li");
                      const trigger = li?.querySelector<HTMLElement>(
                        ':scope > a[aria-haspopup]'
                      );
                      trigger?.focus();
                    }
                  }

                  return (
                    <li
                      class="relative"
                      classList={{ group: hasSubmenu }}
                    >
                      <a
                        href={item.url}
                        class="no-underline hover:underline px-sm last:pl-0 py-xs transition-rebuild"
                        aria-current={
                          location.pathname === item.url ? "page" : undefined
                        }
                        onKeyDown={handleTriggerKeydown}
                        onBlur={() => {
                          // Close keyboard-opened menu when focus leaves entirely
                          requestAnimationFrame(() => {
                            const li = document.activeElement?.closest("li");
                            if (!li || !li.contains(document.activeElement)) {
                              setKbOpenDropdown(null);
                            }
                          });
                        }}
                        {...(hasSubmenu
                          ? {
                              "aria-haspopup": "true" as const,
                              "aria-expanded": kbOpenDropdown() === itemIndex() ? "true" : "false",
                            }
                          : {})}
                      >
                        {item.name}
                      </a>

                      <Show when={item.subItems}>
                        <ul
                          role="menu"
                          class="desktop-submenu absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white border-2 border-dark py-sm px-md mx-auto min-w-40 list-none z-50"
                          classList={{
                            "hidden group-hover:block focus-within:block": kbOpenDropdown() !== itemIndex(),
                            block: kbOpenDropdown() === itemIndex(),
                          }}
                          onKeyDown={handleSubmenuKeydown}
                        >
                          <For each={item.subItems}>
                            {(sub) => (
                              <li role="none" class="py-xs text-center">
                                <Show
                                  when={sub.url}
                                  fallback={
                                    <span
                                      class="block whitespace-nowrap cursor-default"
                                      classList={{
                                        "line-through text-dark/50":
                                          sub.status === "past",
                                        "text-muted": sub.status === "future",
                                      }}
                                    >
                                      {sub.name}
                                    </span>
                                  }
                                >
                                  <a
                                    href={sub.url!}
                                    role="menuitem"
                                    class="no-underline hover:underline block whitespace-nowrap"
                                    tabindex="-1"
                                  >
                                    {sub.name}
                                  </a>
                                </Show>
                              </li>
                            )}
                          </For>
                        </ul>
                      </Show>
                    </li>
                  );
                }}
              </For>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            class="lg:hidden flex items-center gap-xs text-lg font-normal bg-transparent border-none cursor-pointer p-0"
            aria-expanded={mobileOpen()}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen(!mobileOpen())}
          >
            <span>{mobileOpen() ? "Close" : "Menu"}</span>
            <span
              class="text-2xl leading-none align-top pb-1"
              aria-hidden="true"
            >
              {mobileOpen() ? "✕" : "+"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        class="fixed inset-0 bg-white z-50 lg:hidden"
        classList={{ hidden: !mobileOpen() }}
        aria-hidden={!mobileOpen()}
      >
        <div class="container max-w-max-width mx-auto px-md py-lg">
          {/* Mobile Menu Header */}
          <div class="flex h-16 justify-between items-center border-b-2 border-dark pb-md mb-lg translate-y-[-8px]">
            <a href="/">
              <img
                class="h-6 w-auto"
                src={site.logo}
                alt="Rebuild logo."
              />
            </a>
            <button
              class="text-dark flex items-center gap-xs text-lg font-normal bg-transparent border-none cursor-pointer p-0"
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
            >
              <span>Close</span>
              <span class="text-2xl leading-none" aria-hidden="true">
                &times;
              </span>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav aria-label="Mobile navigation" class="mt-3xl">
            <ul class="list-none flex flex-col gap-md">
              <For each={site.main_navigation}>
                {(item) => (
                  <li>
                    <a
                      href={item.url}
                      class="text-dark text-4xl no-underline block transition-rebuild hover:text-blue focus:text-blue"
                      classList={{
                        "text-blue": location.pathname === item.url,
                      }}
                      aria-current={
                        location.pathname === item.url ? "page" : undefined
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </nav>

          {/* Secondary Navigation in Mobile Menu */}
          <nav
            aria-label="Secondary navigation"
            class="mt-2xl pt-lg border-b-2 border-dark pb-lg"
          >
            <ul class="list-none flex gap-lg flex-wrap">
              <For each={site.second_navigation}>
                {(item) => (
                  <li>
                    <a
                      href={item.url}
                      class="text-dark text-xl no-underline transition-rebuild hover:text-blue focus:text-blue"
                      classList={{
                        "text-blue": location.pathname === item.url,
                      }}
                      aria-current={
                        location.pathname === item.url ? "page" : undefined
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
