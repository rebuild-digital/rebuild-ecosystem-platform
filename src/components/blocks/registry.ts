import type { Component } from "solid-js";
import HeroSplash from "./HeroSplash";
import TextSection from "./TextSection";
import Carousel from "./Carousel";
import DirectoryPreview from "./DirectoryPreview";
import ProgrammesPreview from "./ProgrammesPreview";
import InsightsPreview from "./InsightsPreview";
import GatheringsPreview from "./GatheringsPreview";
import Engage from "./Engage";
import HalfCircle from "./HalfCircle";
import ProgressBoard from "./ProgressBoard";

export interface BlockDefinition {
  type: string;
  props?: Record<string, unknown>;
  wrapperClass?: string;
}

// Static imports, not lazy(): a lazy block suspends on the first server render
// after a cold start, and the streamed markup then fails to hydrate.
const registry: Record<string, Component<any>> = {
  HeroSplash,
  TextSection,
  Carousel,
  DirectoryPreview,
  ProgrammesPreview,
  InsightsPreview,
  GatheringsPreview,
  Engage,
  HalfCircle,
  ProgressBoard,
};

export function getBlock(type: string): Component<any> | undefined {
  return registry[type];
}

export default registry;
