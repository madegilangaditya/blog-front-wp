import type { ComponentType } from "react";
import Hero from "../components/sections/Hero";
import Bio from "../components/sections/Bio";

type Section = {
  __typename: string;
  [key: string]: unknown;
};

const sectionComponents: Record<string, ComponentType<any>> = {
  ComponentsSectionsBannerLayout: Hero,
  ComponentsSectionsBioLayout: Bio,
  // ComponentsSectionsTextLayout: TextSection,
  // ComponentsSectionsGalleryLayout: GallerySection,
};

type RenderSectionsProps = {
  sections?: Section[];
};

export default function RenderSections({ sections = [] }: RenderSectionsProps) {
  return (
    <>
      {sections.map((section, index) => {
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