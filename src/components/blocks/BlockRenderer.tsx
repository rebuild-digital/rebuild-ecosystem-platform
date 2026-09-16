import { For, Suspense, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { getBlock, type BlockDefinition } from "./registry";

export interface BlockRendererProps {
  blocks: BlockDefinition[];
}

export default function BlockRenderer(props: BlockRendererProps) {
  return (
    <For each={props.blocks}>
      {(block) => {
        const Component = getBlock(block.type);
        return (
          <Show when={Component}>
            {(Comp) => (
              <div classList={{ [block.wrapperClass ?? ""]: !!block.wrapperClass }}>
                <Suspense>
                  <Dynamic component={Comp()} {...(block.props ?? {})} />
                </Suspense>
              </div>
            )}
          </Show>
        );
      }}
    </For>
  );
}
