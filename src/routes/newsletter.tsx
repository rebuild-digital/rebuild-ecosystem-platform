import { Title, Meta } from "@solidjs/meta";
import FormRenderer from "~/components/FormRenderer";
import { formConfigs } from "~/lib/formConfig";

export default function Newsletter() {
  return (
    <>
      <Title>Stay Updated | Rebuild</Title>
      <Meta
        name="description"
        content="Get updates about new platforms, insights and gatherings."
      />

      <section class="pb-6xl">
        <div class="max-w-[600px] mx-auto">
          <h1 class="text-3xl md:text-5xl font-normal mb-xl">Stay Updated</h1>
          <FormRenderer config={formConfigs["newsletter"]} />
        </div>
      </section>
    </>
  );
}
