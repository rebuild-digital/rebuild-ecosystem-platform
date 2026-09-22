import { Show } from "solid-js";

export interface ToolAction {
  text: string;
  url?: string;
}

export interface Tool {
  version?: string;
  title: string;
  description: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  primaryAction?: ToolAction;
  secondaryAction?: ToolAction;
}

export default function ToolCard(props: { tool: Tool }) {
  return (
    <div class="bg-lighter flex flex-col h-full">
      <div class="relative">
        <Show
          when={props.tool.thumbnail}
          fallback={
            <div class="bg-lighter aspect-video w-full flex items-center justify-center">
              <span class="text-darker text-sm">No preview available</span>
            </div>
          }
        >
          <img
            src={props.tool.thumbnail}
            alt={props.tool.thumbnailAlt ?? ""}
            class="w-full h-auto aspect-video object-cover"
          />
        </Show>
      </div>

      <div class="p-md flex flex-col flex-grow">
        <Show when={props.tool.version}>
          <p class="text-xs text-darker mb-xs">{props.tool.version}</p>
        </Show>
        <h3 class="text-xl md:text-2xl font-normal mb-sm">{props.tool.title}</h3>
        <p class="text-sm md:text-base text-dark mb-lg grow">
          {props.tool.description}
        </p>

        <div class="flex flex-col lg:flex-row gap-xs mt-auto">
          <Show when={props.tool.primaryAction}>
            {(action) => (
              <Show
                when={action().url}
                fallback={
                  <button
                    class="text-center border-2 border-dark bg-muted text-dark px-md py-sm cursor-not-allowed"
                    disabled
                  >
                    {action().text}
                  </button>
                }
              >
                <a
                  href={action().url}
                  class="inline-block text-center border-2 border-dark bg-dark text-light px-md py-sm hover:bg-darker transition-fast no-underline"
                >
                  {action().text}
                </a>
              </Show>
            )}
          </Show>
          <Show when={props.tool.secondaryAction}>
            {(action) => (
              <Show
                when={action().url}
                fallback={
                  <button
                    class="text-center border-2 border-dark bg-lighter text-muted px-md py-sm cursor-not-allowed"
                    disabled
                  >
                    {action().text}
                  </button>
                }
              >
                <a
                  href={action().url}
                  class="inline-block text-center border-2 border-dark bg-light text-dark px-md py-sm hover:bg-lighter transition-fast no-underline"
                >
                  {action().text}
                </a>
              </Show>
            )}
          </Show>
        </div>
      </div>
    </div>
  );
}
