import { MetaProvider, Meta, Link } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Show, createSignal, onMount } from "solid-js";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import FormSidebar from "~/components/FormSidebar";
import { ServerError } from "~/components/ErrorPage";
import SafeErrorBoundary from "~/components/SafeErrorBoundary";
import site from "~/data/site";
import "./app.css";

// The homepage has no hero when it errors, so the header must leave
// transparent mode or its white text would sit on a white page.
function HomeError(props: { onShow: () => void }) {
  onMount(props.onShow);
  return (
    <main
      id="main-content"
      tabindex="-1"
      class="lg:max-w-max-width mx-auto px-md pt-5xl"
    >
      <ServerError />
    </main>
  );
}

function Layout(props: { children: any }) {
  const location = useLocation();
  const isHome = () => location.pathname === "/";
  const [homeErrored, setHomeErrored] = createSignal(false);

  return (
    <MetaProvider>
      <Meta
        property="og:image"
        content={`${site.url}${site.defaultImage}`}
      />
      <Meta property="og:type" content="website" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Link rel="canonical" href={`${site.url}${location.pathname}`} />
      <Link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.title} — Insights`}
        href="/feed.xml"
      />
      <Meta
        name="robots"
        content={site.indexable ? "index, follow" : "noindex, nofollow"}
      />

      <a
        href="#main-content"
        class="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const t = document.getElementById("main-content");
          if (t) {
            t.focus();
            t.scrollIntoView();
          }
        }}
      >
        Skip to main content
      </a>

      <Header solid={homeErrored()} />

      <Show
        when={isHome()}
        fallback={
          <main
            id="main-content"
            tabindex="-1"
            class="lg:max-w-max-width mx-auto px-md pt-5xl min-h-[60vh]"
          >
            <SafeErrorBoundary fallback={<ServerError />}>
              {props.children}
            </SafeErrorBoundary>
          </main>
        }
      >
        <SafeErrorBoundary
          fallback={<HomeError onShow={() => setHomeErrored(true)} />}
        >
          {props.children}
        </SafeErrorBoundary>
      </Show>

      <Footer />
      <FormSidebar />
    </MetaProvider>
  );
}

export default function App() {
  return (
    <Router
      explicitLinks
      root={(props) => <Layout>{props.children}</Layout>}
    >
      <FileRoutes />
    </Router>
  );
}
