import { Show } from "solid-js";
import ImageCredit from "./ImageCredit";
import { srcSet } from "~/lib/images";

export interface Person {
  name: string;
  image: string;
  imageCredit?: string;
  specialty?: string;
  bio?: string;
  role?: string;
  email?: string;
}

export default function PersonCard(props: { person: Person }) {
  return (
    <div>
      <div class="w-full aspect-square bg-muted mb-md relative">
        <img
          src={props.person.image}
          srcset={srcSet(props.person.image)}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          alt={props.person.name}
          class="w-full h-full object-cover"
        />
        <Show when={props.person.imageCredit}>
          <ImageCredit credit={props.person.imageCredit!} />
        </Show>
      </div>

      <Show when={props.person.specialty}>
        <h3 class="text-xl md:text-2xl font-normal mb-sm underline">
          {props.person.name}, {props.person.specialty}
        </h3>
        <Show when={props.person.bio}>
          <p class="text-sm">{props.person.bio}</p>
        </Show>
      </Show>

      <Show when={!props.person.specialty && props.person.role}>
        <h3 class="text-xl md:text-2xl font-normal mb-xs">
          {props.person.name}
        </h3>
        <p class="text-sm md:text-lg text-dark">{props.person.role}</p>
        <Show when={props.person.email}>
          <a
            href={`mailto:${props.person.email}`}
            class="text-base md:text-lg underline"
          >
            {props.person.email}
          </a>
        </Show>
      </Show>

      <Show when={!props.person.specialty && !props.person.role}>
        <h3 class="text-xl md:text-2xl font-normal mb-sm">
          {props.person.name}
        </h3>
      </Show>
    </div>
  );
}
