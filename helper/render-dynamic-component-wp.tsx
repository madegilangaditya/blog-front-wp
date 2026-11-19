import { type ComponentType } from "react";
import Hero from "../components/sections/Hero";
import Bio from "../components/sections/Bio";
import ServicesCard from "../components/sections/ServicesCard";
import FeaturedProject from "@/components/sections/FeaturedProject";
import ExperiencesHistory from "@/components/sections/ExperiencesHistory";
import ResultCounter from "@/components/sections/ResultCounter";

type Section = {
  __typename: string;
  [key: string]: unknown;
};

const sectionComponents: Record<string, ComponentType<any>> = {
  ComponentsSectionsBannerLayout: Hero,
  ComponentsSectionsBioLayout: Bio,
  ComponentsSectionsServicesCardLayout: ServicesCard,
  ComponentsSectionsFeaturedProjectLayout: FeaturedProject,
  ComponentsSectionsExperiencesLayout: ExperiencesHistory,
  ComponentsSectionsResultCounterLayout: ResultCounter,
  // ComponentsSectionsTextLayout: TextSection,
  // ComponentsSectionsGalleryLayout: GallerySection,
};

type RenderSectionsProps = {
  sections?: (Section | null)[] | null;
};

export default async function RenderSections({ sections }: RenderSectionsProps) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => {
        if (!section?.__typename) {
          return null;
        }

        const Component = sectionComponents[section.__typename];

        if (!Component) {
          console.warn("Missing section component:", section.__typename);
          return null;
        }

        return (
          <Component
            key={`${section.__typename}-${index}`}
            data={section}
          />
        );
      })}
    </>
  );
}