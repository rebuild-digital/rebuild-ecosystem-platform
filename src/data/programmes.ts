export interface Programme {
  id: string;
  title: string;
  description: string;
  color: string;
}

export const programmes: Programme[] = [
  {
    id: "investor",
    title: "Investor programme",
    description:
      "Bringing together investors from across Europe taking an active part in rebuilding social platforms",
    color: "var(--color-green)",
  },
  {
    id: "talent",
    title: "Talent programme",
    description:
      "Attracting and directing top talents to social platform start-ups",
    color: "var(--color-blush)",
  },
  {
    id: "public-funds",
    title: "Public funds programme",
    description:
      "Bringing public funds together to support social platforms",
    color: "var(--color-orange)",
  },
  {
    id: "board",
    title: "Board programme",
    description:
      "Activating pioneers and digital leaders in committed board positions",
    color: "var(--color-red)",
  },
];
