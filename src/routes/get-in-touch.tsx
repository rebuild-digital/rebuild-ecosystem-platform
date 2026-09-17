import { Title, Meta } from "@solidjs/meta";
import { For } from "solid-js";
import PageHeader from "~/components/PageHeader";

const links = [
  { label: "Email us", href: "mailto:team@rebuild.net" },
  { label: "Join the directory", href: "#", form: "builder-application" },
  { label: "Suggest a platform", href: "#", form: "builder-promo" },
  {
    label: "Follow us on Linkedin",
    href: "https://linkedin.com/company/rebuild-europe",
  },
  { label: "Get the newsletter", href: "#", form: "newsletter" },
];

export default function GetInTouch() {
  return (
    <>
      <Title>Get in touch | Rebuild</Title>
      <Meta
        name="description"
        content="Don't hesitate to get involved and start following. Get in touch if you want to share a social platform project, apply to join directory or simply share a thought."
      />
      <Meta property="og:title" content="Get in touch" />
      <Meta property="og:description" content="Don't hesitate to get involved and start following. Get in touch if you want to share a social platform project, apply to join directory or simply share a thought." />

      <PageHeader
        title="Get in touch"
        description="Don't hesitate to get involved and start following. Get in touch if you want to share a social platform project, apply to join directory or simply share a thought."
      />

      <section class="pt-4xl pb-0 lg:pb-6xl">
        <div class="max-w-[1400px] mx-auto">
          <div class="flex flex-col gap-y-xl">
            <For each={links}>
              {(link) => (
                <div class="flex flex-row items-center space-x-lg lg:space-x-2xl">
                  <div class="w-8 h-8 lg:w-20 lg:h-20 rounded-full bg-dark shrink-0" />
                  <a
                    href={link.href}
                    {...(link.form ? { "data-form": link.form } : {})}
                    class="text-xl lg:text-8xl hover:underline"
                  >
                    {link.label}
                  </a>
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="mt-4xl pb-6xl">
          <h2 class="text-2xl">
            <a class="underline" href="/downloads/rebuild-press-kit-dec25.zip">
              Download press kit
            </a>
          </h2>
        </div>
      </section>
    </>
  );
}
