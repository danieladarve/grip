import React, { useEffect } from "react";
import type { Landing } from "@/lib/sanity/groq";
import Button from "@/components/button";
import { urlForImage } from "@/lib/sanity/image";
import { useInView } from "react-intersection-observer";
import { useGripStore } from "../store/grip-slice";
import { handleIntoView } from "@/components/desktop-navigation";
import type { SocialLinks } from "@/lib/sanity/groq";
import MobileBottomNav from "@/components/mobile-bottom-nav";

interface ScrollableLanding extends Landing {
  isLast: boolean;
  social?: SocialLinks;
}

const ScrollableLanding = ({
  title,
  subtitle,
  cta,
  mainImage,
  button,
  social,
}: ScrollableLanding) => {
  const {
    setCurrentSection,
    setCurrentIndex,
    currentIndex,
    sections,
    setMenuOpen,
  } = useGripStore();

  const { ref, inView } = useInView({
    threshold: 0.3,
    onChange: (inView) => {
      if (!inView) {
      }
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex >= 0 && inView) {
        setCurrentSection(null);
        setCurrentIndex(-1);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [inView, currentIndex, setCurrentSection, setCurrentIndex]);

  const image = urlForImage(mainImage).url();
  return (
    <section
      ref={ref}
      className="scrollable-section landing bg-grip-azure pt-[74px] lg:pt-0"
    >
      <div className="relative h-full w-full px-6 md:pt-10 md:pr-14 md:pl-16 lg:w-1/2">
        <div className="relative z-50 h-full w-full">
          <div className="flex justify-end pt-8 lg:hidden lg:pt-0">
            <picture className="">
              <img
                className="w-full max-w-[117px] -scale-x-100 "
                src={image}
                alt={title ?? ""}
              />
            </picture>
          </div>

          <div>
            {title && <h1 className="mb-5">{title}</h1>}
            {subtitle && <h2 className="mb-6">{subtitle}</h2>}
          </div>
          {button && (
            <div className="mb-6">
              <Button variant="secondary" onClick={() => setMenuOpen()}>
                {button}
              </Button>
            </div>
          )}
          {cta && sections && (
            <Button
              variant="cta"
              className="light"
              icon="arrow-down"
              onClick={(event) =>
                handleIntoView(
                  event,
                  window.outerWidth >= 1024
                    ? `.main-${sections[0].id}`
                    : ".mobile-snap"
                )
              }
            >
              {cta}
            </Button>
          )}
        </div>

        <div className="absolute bottom-0 z-0 hidden lg:block">
          <picture>
            <img
              className="w-full max-w-[220px] xl:max-w-[297px]"
              alt="Grip"
              src={image}
              width="297"
              height={245}
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default ScrollableLanding;
