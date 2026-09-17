import { Title, Meta } from "@solidjs/meta";
import FormRenderer from "~/components/FormRenderer";
import { formConfigs } from "~/lib/formConfig";

export default function GatheringRequest() {
  return (
    <>
      <Title>Request an Invitation to Rebuild 3 | Rebuild</Title>
      <Meta
        name="description"
        content="Show interest in joining Rebuild 3 in Paris. Share your details and tell us what you would like to contribute."
      />

      <section class="pb-6xl">
        <div class="max-w-[600px] mx-auto">
          <h1 class="text-3xl md:text-5xl font-normal mb-xl">
            Request an Invitation
          </h1>
          <FormRenderer config={formConfigs["gathering-invitation-rebuild3"]} />
        </div>
      </section>
    </>
  );
}
