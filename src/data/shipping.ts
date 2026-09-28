import raw from "./shipping.json";
import { parseProgressItems } from "~/lib/progressItems";
import type { ProgressBoardProps } from "~/components/blocks/ProgressBoard";

// "What we are shipping": Rebuild's outcomes, in display order. Edit the JSON;
// `parseProgressItems` rejects unknown fields and statuses. Place it with
// `{ type: "ProgressBoard", props: shipping }`.
export const shipping: ProgressBoardProps = {
  title: "What We Are Shipping",
  intro:
    "Rebuild is about moving from talk to action. These are the concrete things we're shipping.",
  items: parseProgressItems(raw),
};
