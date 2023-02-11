import React, { useEffect } from "react";
import type { Landing } from "@/lib/sanity/groq";
import Button from "@/components/button";
import { urlForImage } from "@/lib/sanity/image";
import { useInView } from "react-intersection-observer";
import { useGripStore } from "../store/grip-slice";
import { handleIntoView } from "@/components/desktop-navigation";
import type { SocialLinks } from "@/lib/sanity/groq";
import LongArrow from "@/components/svg/long-arrow";
interface ScrollableLanding extends Landing {
  isLast?: boolean;
  social?: SocialLinks;
}

const InnerLanding = ({ title, cta, mainImage, button }: ScrollableLanding) => {
  const { sections, setMenuOpen, openForm } = useGripStore();
  const image = urlForImage(mainImage).url();
  return (
    <>
      <div className="relative z-50 h-full w-full">
        <div className="flex justify-end pt-2 md:pt-8 lg:hidden lg:pt-0">
          <picture className="">
            <img
              className="w-full max-w-[100px] -scale-x-100 "
              src={image}
              alt={title ?? ""}
              width="297"
              height="245"
            />
          </picture>
        </div>

        <div className="flex max-w-[480px] lg:mt-14">
          <a
            className="whats-grip"
            onClick={(event) =>
              handleIntoView(event, `.main-${sections[0].id}`)
            }
          >
            <span className="relative z-10 mb-10 bg-grip-azure">{`What's Grip - scroll please`}</span>
            <div className="animate-bounce">
              <LongArrow className={"ml-0.5"} />
            </div>
          </a>
          <div>
            {title && <h1 className="mb-10">{title}</h1>}
            {/*{subtitle && <h2 className="mb-6">{subtitle}</h2>}*/}
            {button && (
              <div className="mb-6 hidden lg:block">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setMenuOpen();
                  }}
                >
                  {button}
                </Button>
              </div>
            )}
            {button && (
              <div className="mb-6 lg:hidden">
                <Button
                  variant="secondary"
                  onClick={() => {
                    openForm();
                  }}
                >
                  {button}
                </Button>
              </div>
            )}
            {/*{cta && sections && (*/}
            {/*  <Button*/}
            {/*    variant="cta"*/}
            {/*    className="light"*/}
            {/*    icon="arrow-down"*/}
            {/*    onClick={(event) =>*/}
            {/*      handleIntoView(*/}
            {/*        event,*/}
            {/*        window.outerWidth >= 1024*/}
            {/*          ? `.main-${sections[0].id}`*/}
            {/*          : ".mobile-snap"*/}
            {/*      )*/}
            {/*    }*/}
            {/*  >*/}
            {/*    {cta}*/}
            {/*  </Button>*/}
            {/*)}*/}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0  z-0 hidden px-6 md:pr-14 lg:block lg:pr-16 xl:pr-20 2xl:pr-28">
        <picture>
          <img
            className="w-full max-w-[220px] xl:max-w-[297px]"
            alt="Grip"
            src={image}
            width="297"
            height="245"
          />
        </picture>
      </div>
    </>
  );
};

const ScrollableLanding = (props: ScrollableLanding) => {
  const { setCurrentSection, setCurrentIndex, currentIndex } = useGripStore();
  // const { mainImage } = props;
  const { ref, inView } = useInView({
    threshold: 0.3,
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

  return (
    <section
      ref={ref}
      className="scrollable-section landing bg-grip-azure pt-[74px] lg:pt-0"
    >
      <div className="fullscreen relative w-full px-6 md:pt-10 md:pr-14 md:pl-16 lg:w-1/2 lg:pr-16 xl:pr-20 2xl:pr-28">
        <InnerLanding {...props} />
      </div>
    </section>
  );
};

export default ScrollableLanding;
