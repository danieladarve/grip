import type { Section, SocialLinks } from "@/lib/sanity/groq";
import type { GripStateSection } from "../store/grip-slice";
import { useGripStore } from "../store/grip-slice";
import ScrollableSection from "@/components/scrollable-section";
import ScrollableLanding from "@/components/scrollable-landing";
import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import MobileNavigation from "@/components/mobile-navigation";

export interface ScrollerProps {
  landing?: Section;
  sections?: Section[];

  social?: SocialLinks;
}

const isLast = (i: number, sections: GripStateSection[]) => {
  return i + 1 === sections.length;
};

const Scroller = ({ sections, landing, social }: ScrollerProps) => {
  const { insertSection, sections: storeSections } = useGripStore();

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.96,
  });

  useEffect(() => {
    if (!storeSections.length) {
      sections.forEach((item) => {
        if (item !== null) {
          insertSection(item._id, item);
        }
      });
    }
  }, [sections, insertSection, storeSections.length]);

  return (
    <>
      <ScrollableLanding
        _id={landing._id}
        title={landing.title as string}
        subtitle={landing.subtitle}
        cta={landing.cta}
        mainImage={landing.mainImage}
        isLast={false}
        key={landing._id}
        button={landing.button}
        social={social}
      />

      <div
        ref={ref}
        className="mobile-snap relative z-40 flex h-screen w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide lg:hidden"
      >
        <div className={clsx("mobile-top-nav", inView ? "active" : "")}>
          <MobileNavigation />
        </div>
        {storeSections.map((sectionState: GripStateSection, i, row) => {
          const lastSection: boolean = isLast(i, row);
          const {
            section: { _id, title, cta, body, mainImage, variant },
          } = sectionState;

          return (
            <ScrollableSection
              _id={_id}
              title={title}
              cta={cta}
              body={body}
              mainImage={mainImage}
              variant={variant}
              isLast={lastSection}
              key={_id}
              className={`flex shrink-0 section-${_id}`}
            />
          );
        })}
      </div>
      {storeSections.map((sectionState: GripStateSection, i, row) => {
        const lastSection: boolean = isLast(i, row);
        const {
          section: { _id, title, cta, body, mainImage, variant },
        } = sectionState;

        return (
          <ScrollableSection
            _id={_id}
            title={title}
            cta={cta}
            body={body}
            mainImage={mainImage}
            variant={variant}
            isLast={lastSection}
            key={_id}
            className={`hidden lg:flex main-${_id}`}
          />
        );
      })}
    </>
  );
};

export default Scroller;
