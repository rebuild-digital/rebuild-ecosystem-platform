import { Title, Meta } from "@solidjs/meta";
import { createAsync, cache } from "@solidjs/router";
import { Suspense } from "solid-js";
import { getEspeaData } from "~/data/espea";
import SignalField from "~/components/SignalField";
import AnimateNumber from "~/components/AnimateNumber";

const getDataPageData = cache(async () => {
  "use server";
  return await getEspeaData();
}, "espea-data");

export const route = {
  load: () => getDataPageData(),
};

export default function Data() {
  const espea = createAsync(() => getDataPageData());

  const revenue = () => espea()?.revenue ?? 85;
  const europeanShare = () => espea()?.europeanShare ?? 5;
  const metaShare = () => espea()?.metaShare ?? 55;
  const jobs = () => espea()?.jobs ?? "1M+";

  return (
    <>
      <Title>Data | Rebuild</Title>
      <Meta
        name="description"
        content="Key numbers on the European social platform economy — revenue, market concentration, and economic outflows."
      />
      <Meta property="og:title" content="Data" />
      <Meta property="og:description" content="Key numbers on the European social platform economy — revenue, market concentration, and economic outflows." />
      <Meta
        property="og:image"
        content="/assets/images/thumbnail_platformeconomy.webp"
      />

      <Suspense>
        {/* Hero */}
        <section class="pb-2xl" aria-label="Introduction">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
            <div>
              <h1 class="font-normal text-4xl md:text-5xl lg:text-6xl mb-lg">
                Social
                <br class="hidden lg:inline" /> Platform
                <br class="hidden lg:inline" /> Economy
              </h1>
              <p class="max-w-115 text-xl text-darker">
                Key figures illustrating the state of social platforms in Europe
                — where the money flows, who captures it, and what stays.
              </p>
            </div>
            <div class="rounded-lg overflow-hidden aspect-square hidden lg:block">
              <SignalField
                cols={13}
                rows={13}
                dotGap={0.35}
                speed={0.6}
                frequency={0.8}
                seed={2025}
              />
            </div>
            <div
              class="rounded-lg overflow-hidden lg:hidden"
              style="aspect-ratio: 13/7;"
            >
              <SignalField
                cols={13}
                rows={7}
                dotGap={0.35}
                speed={0.6}
                frequency={0.8}
                seed={2025}
              />
            </div>
          </div>
        </section>

        <hr aria-hidden="true" />

        {/* Hero stat */}
        <section
          class="py-4xl md:py-5xl"
          aria-label="Annual European social platform revenue"
        >
          <div>
            <AnimateNumber
              value={`€${revenue()}b`}
              class="font-normal leading-none"
              style="font-size: clamp(6rem, 12vw, 12rem);"
            />
            <p class="text-xl md:text-2xl text-darker mt-md max-w-120">
              Annual social platform revenue generated in Europe.
            </p>
          </div>
        </section>

        <hr aria-hidden="true" />

        {/* Supporting stats */}
        <section class="py-4xl md:py-5xl" aria-label="Key statistics">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3xl md:gap-4xl">
            <div>
              <AnimateNumber
                value={`${europeanShare()}%`}
                class="font-normal leading-none"
                style="font-size: clamp(4.5rem, 10vw, 8rem);"
              />
              <p class="text-lg text-darker mt-md">
                Revenue share that stays with European companies. The other{" "}
                {100 - europeanShare()}% flows to other continents.
              </p>
            </div>

            <div>
              <AnimateNumber
                value={`${metaShare()}%`}
                class="font-normal leading-none"
                style="font-size: clamp(4.5rem, 10vw, 8rem);"
              />
              <p class="text-lg text-darker mt-md">
                Share of European social platform revenue captured by a single
                non-European company.
              </p>
            </div>

            <div>
              <AnimateNumber
                value={jobs()}
                class="font-normal leading-none"
                style="font-size: clamp(4.5rem, 10vw, 8rem);"
              />
              <p class="text-lg text-darker mt-md">
                Potential jobs in Europe's social platform economy.
              </p>
            </div>
          </div>
        </section>

        <hr aria-hidden="true" />

        {/* Sources */}
        <section class="py-4xl pb-6xl" id="sources">
          <h2 class="text-2xl md:text-3xl font-normal mb-xl">
            Notes and assumptions
          </h2>
          <div class="rich-text text-sm text-darker max-w-180 leading-relaxed">
            <p>
              Hereof non-European company revenue. Percentage of non-European
              company revenue. All revenue figures are in USD billions (B). EUR
              conversion: 2024 rate = 0.85, 2025 rate = 0.84. Figures represent
              European revenue only, not global revenue. Some figures are
              estimates based on regional revenue percentages from company
              filings. Data sourced from latest available company earnings
              reports, SEC filings, and financial data providers.
            </p>
            <p class="mt-lg pt-lg border-t border-lighter text-xs text-muted">
              This analysis is a living draft by{" "}
              <a href="/" class="underline hover:text-dark">
                Rebuild
              </a>
              .
            </p>
            <p class="text-xs text-muted">
              Corrections and contributions are welcome —{" "}
              <a
                href="mailto:data@rebuild.net"
                class="underline hover:text-dark"
              >
                data@rebuild.net
              </a>
              .
            </p>
          </div>
        </section>
      </Suspense>
    </>
  );
}
