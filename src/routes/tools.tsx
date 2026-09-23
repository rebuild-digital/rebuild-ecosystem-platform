import { Title, Meta } from "@solidjs/meta";
import { For } from "solid-js";
import PageHeader from "~/components/PageHeader";
import ToolCard, { type Tool } from "~/components/ToolCard";

const tools: Tool[] = [
  {
    version: "v1.0",
    title: "Social Design Framework",
    description:
      "The Social Design Framework is a practical lens for designing and evaluating social platforms around genuine human connection rather than pure engagement metrics.",
    thumbnail: "/assets/images/frameworks/new-sdf-thumbnail-2400.webp",
    thumbnailAlt: "Social Design Framework",
    secondaryAction: {
      text: "Learn more",
      url: "https://socialdesignframework.eu/",
    },
  },
  {
    version: "v0.8",
    title: "Social Platform Taxonomy",
    description:
      "Social platforms take many shapes. Many more than today's monopoly situation lets us believe. The Social Platform taxonomy is a step in unbundling and navigating the landscape.",
    thumbnail: "/assets/images/frameworks/social-platform-taxonomy-2400.webp",
    thumbnailAlt: "Social Platform Taxonomy",
  },
  {
    version: "v0.8",
    title: "Social Platform Models",
    description:
      "Rebuilding Europe's social platforms through diversity. This is a first attempt at indexing the numerous different models the future of social platforms rests upon.",
    thumbnail: "/assets/images/frameworks/social-platform-models.png",
    thumbnailAlt: "Social Platform Models",
  },
  {
    version: "v0.8",
    title: "Social Scale",
    description:
      "Visualising the need to think social platforms all across the scale. From the most intimate relationships in our lives to the infrastructure our continent rests upon.",
    thumbnail: "/assets/images/frameworks/social-scale.png",
    thumbnailAlt: "Social Scale",
  },
];

export default function Tools() {
  return (
    <>
      <Title>Tools | Rebuild</Title>
      <Meta
        name="description"
        content="We need more qualified ways to grasp social platforms. Therefore, we're sharing working models and tools for the entire industry to work with, use, challenge and qualify."
      />
      <Meta property="og:title" content="Tools" />
      <Meta property="og:description" content="We need more qualified ways to grasp social platforms. Therefore, we're sharing working models and tools for the entire industry to work with, use, challenge and qualify." />

      <PageHeader
        title="Tools"
        description="We need more qualified ways to grasp social platforms. Therefore, we're sharing working models and tools for the entire industry to work with, use, challenge and qualify."
      />

      <hr />

      <section class="py-4xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          <For each={tools}>{(tool) => <ToolCard tool={tool} />}</For>
        </div>
      </section>

      <div class="mt-3xl pb-6xl">
        <h2 class="text-4xl">
          What tool do you wish existed?
          <br />
          <a class="underline" href="mailto:frameworks@rebuild.net">
            Let us know
          </a>
          .
        </h2>
      </div>
    </>
  );
}
