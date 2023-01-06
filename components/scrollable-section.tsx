import React, { useCallback, useEffect, useState } from "react";
import type { Post } from "@/lib/sanity/groq";
import clsx from "clsx";
import Button from "@/components/button";
import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useGripStore } from "../store/grip-slice";
import MarketTrends from "@/components/svg/market-trends";
import ProjectPositioning from "@/components/svg/project-positioning";
import IndustryInsights from "@/components/svg/industry-insights";
import RegionalBreakdown from "@/components/svg/regional-breakdown";
import { Transition } from "@headlessui/react";

interface ScrollableSectionProps extends Post {
  isLast: boolean;
  className?: string;
}

const Svg = ({
  type = "",
  className = "",
}: {
  type: string;
  className?: string;
}) => {
  switch (type) {
    case "power-blue":
      return <MarketTrends className={className} />;
    case "yellow":
      return <ProjectPositioning className={className} />;
    case "black-haze":
      return <IndustryInsights className={className} />;
    case "coral":
      return <RegionalBreakdown className={className} />;
    default:
      return null;
  }
};

const ScrollableSection = ({
  _id,
  title,
  cta,
  body,
  mainImage,
  isLast,
  variant,
  className,
}: ScrollableSectionProps) => {
  const [appear, setAppear] = useState(true);
  const {
    currentIndex,
    sections,
    setCurrentSection,
    setCurrentIndex,
    setMenuOpen,
  } = useGripStore();

  const handleSetCurrentIndex = useCallback(
    (id) => {
      setCurrentSection(id);
      const currentIndex = sections.findIndex((i) => i.id === id);
      setCurrentIndex(currentIndex);
    },
    [sections, setCurrentSection, setCurrentIndex]
  );

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.7,
    onChange: (inView) => {
      if (inView) {
        handleSetCurrentIndex(_id);
      }
    },
  });

  useEffect(() => {
    if (inView && currentIndex === -1) {
      handleSetCurrentIndex(_id);
    }
  }, [inView, currentIndex, _id, handleSetCurrentIndex, setCurrentIndex]);
  const image = urlForImage(mainImage).url();

  return (
    <section
      ref={ref}
      className={clsx("scrollable-section", className, `bg-grip-${variant}`)}
    >
      <Transition
        appear={true}
        show={inView}
        unmount={appear}
        afterLeave={() => {
          setAppear(false);
        }}
        afterEnter={() => {
          setAppear(false);
        }}
        enter="transition-opacity ease-in duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative h-full w-full px-6 md:pl-16 md:pr-14 lg:w-1/2 lg:pl-28 lg:pr-14">
          <div className="relative z-30 w-full pt-28 md:pt-[16%]">
            <div className="mb-6 lg:mb-8">
              {title && <PortableText value={title} />}
            </div>
            <div className="mb-3 w-full md:w-6/12 lg:w-11/12 2xl:w-7/12">
              <PortableText value={body} />
            </div>
            {cta && (
              <Button
                variant="cta"
                className="dark mb-10"
                icon="arrow-right"
                onClick={() => setMenuOpen()}
              >
                {cta}
              </Button>
            )}
            {mainImage && (
              <Image
                src={image}
                alt=""
                className="w-full max-w-[450px] border border-black"
                width={536}
                height={357}
              />
            )}
          </div>
          <div className="absolute bottom-0 right-0 left-0 z-10 lg:pl-28">
            <div className="svg-container">
              <Svg type={variant} className="w-full" />
            </div>
          </div>
        </div>
      </Transition>
    </section>
  );
};

export default ScrollableSection;
