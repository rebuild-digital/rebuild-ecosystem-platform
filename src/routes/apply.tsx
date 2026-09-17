import { Title, Meta } from "@solidjs/meta";
import FormRenderer from "~/components/FormRenderer";
import { formConfigs } from "~/lib/formConfig";

export default function Apply() {
  return (
    <>
      <Title>Join the Directory | Rebuild</Title>
      <Meta
        name="description"
        content="Are you building a social platform in Europe? Join our directory."
      />

      <section class="pb-6xl">
        <div class="max-w-[600px] mx-auto">
          <h1 class="text-3xl md:text-5xl font-normal mb-xl">
            Join the Directory
          </h1>
          <FormRenderer config={formConfigs["builder-application"]} />
        </div>
      </section>
    </>
  );
}
