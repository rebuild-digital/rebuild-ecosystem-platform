import { Title, Meta } from "@solidjs/meta";
import FormRenderer from "~/components/FormRenderer";
import { formConfigs } from "~/lib/formConfig";

export default function Suggest() {
  return (
    <>
      <Title>Suggest a Platform | Rebuild</Title>
      <Meta
        name="description"
        content="Do you know of a social platform that should be in our directory?"
      />
      <Meta property="og:title" content="Suggest a Platform" />
      <Meta property="og:description" content="Do you know of a social platform that should be in our directory?" />

      <section class="pb-6xl">
        <div class="max-w-150 mx-auto">
          <h1 class="text-3xl md:text-5xl font-normal mb-xl">
            Suggest a Platform
          </h1>
          <FormRenderer config={formConfigs["builder-promo"]} />
        </div>
      </section>
    </>
  );
}
