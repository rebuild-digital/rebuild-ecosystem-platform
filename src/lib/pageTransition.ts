// Page transitions for MPA navigation (the router uses explicitLinks, so
// internal links are full page loads).
//
// Leave: clicking an internal link fades the page out to the background
// color, then navigates. Enter: the next page starts hidden and fades in once
// it is parsed and fonts are ready. Undecoded images fade in on their own.
//
// Between two non-home pages the header is identical, so it's held in place
// (.pt-hold) and only the content fades. The home page's header is
// transparent over the hero, so transitions to/from home fade everything.
//
// Runs as an inline script in <head> so the enter state applies before the
// first paint. Keep durations in sync with the CSS in app.css.

function pageTransition() {
  var root = document.documentElement;
  var DURATION = 220;
  var READY_CAP = 180;
  var KEY = "page-transition";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function reveal() {
    root.classList.remove("pt-enter");
    // Drop the hold once the fade-in has finished.
    setTimeout(function () {
      if (!root.classList.contains("pt-enter")) root.classList.remove("pt-hold");
    }, DURATION);
  }

  function holdsHeader(fromPath: string, toPath: string) {
    return fromPath !== "/" && toPath !== "/";
  }

  // Visible images that aren't decoded yet must not hold back the page's
  // first frame (large photos take hundreds of ms to decode). Decode them off
  // the critical path and fade each one in once it's ready instead of popping.
  function deferImages() {
    for (var i = 0; i < document.images.length; i++) {
      var img = document.images[i];
      if (img.complete && img.naturalWidth) continue;
      var r = img.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > innerHeight) continue;
      img.decoding = "async";
      img.setAttribute("data-pt-img", "hidden");
      img
        .decode()
        .catch(function () {})
        .then(
          function (el: HTMLImageElement) {
            el.setAttribute("data-pt-img", "shown");
          }.bind(null, img),
        );
    }
  }

  try {
    var saved = (sessionStorage.getItem(KEY) || "").split("|");
    sessionStorage.removeItem(KEY);
    if (saved[1] && Date.now() - Number(saved[0]) < 5000) {
      if (holdsHeader(saved[1], location.pathname)) root.classList.add("pt-hold");
      root.classList.add("pt-enter");
      // Never leave a page hidden, whatever happens below.
      setTimeout(reveal, 1000);
      var ready = function () {
        if (document.readyState === "loading") return;
        document.removeEventListener("readystatechange", ready);
        deferImages();
        Promise.race([
          document.fonts.ready,
          new Promise(function (done) {
            setTimeout(done, READY_CAP);
          }),
        ]).then(function () {
          requestAnimationFrame(reveal);
        });
      };
      document.addEventListener("readystatechange", ready);
    }
  } catch (e) {
    root.classList.remove("pt-enter");
  }

  // Restored from the back/forward cache mid-transition: show the page.
  addEventListener("pageshow", function (e) {
    if (e.persisted) root.classList.remove("pt-leave", "pt-enter", "pt-hold");
  });

  var leaving = false;
  // Listen on window so handlers that call preventDefault (router, skip
  // link, menus) run first.
  addEventListener("click", function (e) {
    if (
      leaving ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    var a = (e.target as Element | null)?.closest?.("a[href]") as
      | HTMLAnchorElement
      | null;
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download"))
      return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search)
      return;
    if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // files: feed.xml, pdfs…

    e.preventDefault();
    leaving = true;
    try {
      sessionStorage.setItem(KEY, Date.now() + "|" + location.pathname);
    } catch (err) {}
    // Start fetching while the page fades out.
    var hint = document.createElement("link");
    hint.rel = "prefetch";
    hint.href = url.href;
    document.head.appendChild(hint);
    if (holdsHeader(location.pathname, url.pathname)) root.classList.add("pt-hold");
    root.classList.add("pt-leave");
    setTimeout(function () {
      leaving = false;
      location.href = url.href;
    }, DURATION);
    // If the navigation never commits (204, download, user hit stop),
    // don't leave the page blank.
    setTimeout(function () {
      root.classList.remove("pt-leave", "pt-hold");
    }, 8000);
  });
}

export const pageTransitionScript = `(${pageTransition.toString()})()`;
