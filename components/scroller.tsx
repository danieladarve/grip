import type { Section, SocialLinks } from "@/lib/sanity/groq";
import type { GripStateSection } from "../store/grip-slice";
import { useGripStore } from "../store/grip-slice";
import ScrollableSection from "@/components/scrollable-section";
import ScrollableLanding from "@/components/scrollable-landing";
import React, { useEffect, useState } from "react";
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
  const {
    insertSection,
    sections: storeSections,
    currentIndex,
  } = useGripStore();

  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const el: HTMLElement = document.querySelector("section.main");
    const landingEl: HTMLElement = document.querySelector(
      "section.scrollable-section.landing"
    );
    const scroller = () => {
      const scrollPosition = el.scrollTop; // => scroll position
      setShowMobileNav(scrollPosition >= landingEl.clientHeight);
    };
    scroller();
    el.addEventListener("scroll", scroller);
    return () => {
      el.removeEventListener("scroll", scroller);
    };
  }, []);

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
      <section className="inner-scroller relative h-full snap-y snap-mandatory scrollbar-hide">
        <div
          className={clsx(
            "mobile-top-nav",
            showMobileNav ? "active" : "",
            currentIndex === 0 ? "init" : ""
          )}
        >
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
              className={`flex main-${_id}`}
            />
          );
        })}
      </section>
    </>
  );
};

export default Scroller;
