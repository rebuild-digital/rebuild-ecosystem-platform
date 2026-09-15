import { lazy, type Component } from "solid-js";

export interface BlockDefinition {
  type: string;
  props?: Record<string, unknown>;
  wrapperClass?: string;
}

const registry: Record<string, Component<any>> = {
  HeroSplash: lazy(() => import("./HeroSplash")),
  TextSection: lazy(() => import("./TextSection")),
  Carousel: lazy(() => import("./Carousel")),
  DirectoryPreview: lazy(() => import("./DirectoryPreview")),
  ProgrammesPreview: lazy(() => import("./ProgrammesPreview")),
  InsightsPreview: lazy(() => import("./InsightsPreview")),
  GatheringsPreview: lazy(() => import("./GatheringsPreview")),
  Engage: lazy(() => import("./Engage")),
  HalfCircle: lazy(() => import("./HalfCircle")),
};

export function getBlock(type: string): Component<any> | undefined {
  return registry[type];
}

export default registry;
