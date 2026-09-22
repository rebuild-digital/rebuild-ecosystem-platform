export interface CarouselSlide {
  id: string;
  headline: string;
  subheader: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
}

export const carouselSlides: CarouselSlide[] = [
  {
    id: "slide-1",
    headline: "Sign the Rebuild Letter",
    subheader:
      "Add your public support to European Social Platforms by signing the Rebuild Letter - today!",
    image: "/assets/images/letter-rb1.webp",
    ctaText: "Sign here",
    ctaLink: "https://letter.rebuild.net",
    bgColor: "var(--color-blue-light)",
  },
  {
    id: "slide-2",
    headline: "Gatherings",
    subheader:
      "Three 48-hour gatherings across 2026, tailored to the entrepreneurs building the next generation of social platforms. Designed to connect, build, and act.",
    image: "/assets/images/gatherings-main/gatherings-main-1.webp",
    ctaText: "Learn more",
    ctaLink: "/gatherings",
    bgColor: "var(--color-blonde-light)",
  },
  {
    id: "slide-3",
    headline: "Directory",
    subheader:
      "Rebuild is building a directory of every social platform in Europe. More than 300 platforms identified so far. Who are we missing?",
    image: "/assets/images/gatherings-carousel.webp",
    ctaText: "Explore it here",
    ctaLink: "/directory",
    bgColor: "var(--color-blue-tint)",
  },
  {
    id: "slide-4",
    headline: "Margrethe Vestager on the Rebuild purpose",
    subheader:
      "Why Europe needs social platforms built for people, in the words of our patron",
    image: "/assets/images/margrethe.webp",
    ctaText: "Read more",
    ctaLink: "/insights/a-word-from-margrethe",
    bgColor: "var(--color-green-light)",
  },
];
