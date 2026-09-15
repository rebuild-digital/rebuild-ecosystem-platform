import type { BlockDefinition } from "~/components/blocks/registry";
import splashImages from "./splashImages";
import { carouselSlides } from "./carousel";
import { programmes } from "./programmes";
import { gatherings } from "./gatherings";

const homeBlocks: BlockDefinition[] = [
  {
    type: "HeroSplash",
    props: { images: splashImages, interval: 4000 },
  },
  {
    type: "TextSection",
    props: {
      html: 'Rebuild is a sprint for European social platforms. Connecting the entrepreneurs, the pioneers, the investors and the digital leaders building the next generation of social platforms.<br /><br />Through gatherings, programmes, and tools <span class="font-bold">we build</span>.',
    },
    wrapperClass: "py-3xl md:py-6xl",
  },
  {
    type: "Carousel",
    props: { slides: carouselSlides },
    wrapperClass: "-mx-(--spacing-md) md:mx-0 pb-3xl md:pb-6xl",
  },
  {
    type: "DirectoryPreview",
    props: {
      platforms: [],
      totalCount: 0,
    },
    wrapperClass: "pb-3xl md:pb-6xl",
  },
  {
    type: "ProgrammesPreview",
    props: { programmes },
    wrapperClass: "pb-3xl md:pb-6xl",
  },
  {
    type: "InsightsPreview",
    props: { insights: [] },
    wrapperClass: "pb-4xl md:pb-7xl",
  },
  {
    type: "TextSection",
    props: {
      html: "Three 48-hour gatherings: Rebuild 1, Rebuild 2, and Rebuild 3. Each designed to connect, build, and act. Copenhagen, Helsinki, and Paris.",
    },
  },
  {
    type: "GatheringsPreview",
    props: { gatherings },
  },
  {
    type: "Engage",
    wrapperClass: "pb-3xl md:pb-6xl",
  },
  {
    type: "HalfCircle",
  },
];

export default homeBlocks;
