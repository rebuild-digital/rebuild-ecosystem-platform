export interface TextSectionProps {
  html: string;
}

export default function TextSection(props: TextSectionProps) {
  return (
    <h2
      class="mx-auto text-center text-xl md:text-2xl xl:text-3xl max-w-[50ch] xl:max-w-[45ch]"
      innerHTML={props.html}
    />
  );
}
