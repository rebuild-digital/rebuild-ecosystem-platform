import { Title, Meta } from "@solidjs/meta";
import BlockRenderer from "~/components/blocks/BlockRenderer";
import homeBlocks from "~/data/homeBlocks";

export default function Home() {
  return (
    <main id="main-content" tabindex="-1">
      <Title>Rebuild</Title>
      <Meta
        name="description"
        content="Twelve months to catalyse European social platforms."
      />

      <BlockRenderer blocks={homeBlocks} />
    </main>
  );
}
