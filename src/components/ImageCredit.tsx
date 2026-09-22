interface ImageCreditProps {
  credit: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark";
}

const positionClasses = {
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
};

const themeClasses = {
  light: "bg-dark/50 text-white",
  dark: "bg-light/80 text-dark",
};

export default function ImageCredit(props: ImageCreditProps) {
  return (
    <div
      class={`absolute ${positionClasses[props.position ?? "bottom-left"]} ${themeClasses[props.theme ?? "light"]} text-[10px] px-xs py-xxs m-xs`}
    >
      Photo by: {props.credit}
    </div>
  );
}
