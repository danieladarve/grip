import type { Settings } from "@/lib/sanity/groq";
import SideContact from "@/components/side-contact";
import Scroller from "@/components/scroller";
import DesktopNavigation from "@/components/desktop-navigation";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import React, { useState } from "react";
import clsx from "clsx";
import { useGripStore } from "../../store/grip-slice";
import BottomMobileMenu from "@/components/bottom-mobile-menu";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { PortableText } from "@portabletext/react";
import Button from "@/components/button";
import Link from "next/link";
import MobileShapes from "@/components/svg/mobile-shapes";
import { useInView } from "react-intersection-observer";
import MobileForm from "@/components/mobile-form";
import Social from "@/components/social";
import Close from "@/components/svg/close";
import Shapes from "@/components/svg/shapes";
import Logo from "@/components/svg/logo";

const HomePage = ({ settings }: { settings: Settings }) => {
  const [openForm, setOpenForm] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(true);
  const {
    currentIndex,
    mobileFormOpen,
    menuOpen,
    setMobileFormOpen,
    setMenuOpen,
  } = useGripStore();
  const { sections, side, social, landing, formSettings, formData, footer } =
    settings;
  const { body, cta, title, tryGripBeta } = side;
  const { facebook, linkedin, instagram } = social;

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.1,
  });

  const handleFooterLink = () => {
    setMobileFormOpen(false);
    setMenuOpen();
  };

  return (
    <>
      <SideContact
        tryGripBeta={tryGripBeta}
        body={body}
        cta={cta}
        title={title}
        social={social}
        formItems={formData}
        formSettings={formSettings}
        footer={footer}
      />
      <DesktopNavigation />

      <section className="main relative h-full w-full snap-y overflow-y-auto overscroll-y-contain scrollbar-hide lg:snap-mandatory">
        <Scroller social={social} sections={sections} landing={landing} />
        <section
          ref={ref}
          className="app-height relative overflow-hidden bg-grip-midnight lg:hidden"
        >
          <div className="absolute top-0 z-10 flex h-[72px] w-full items-center bg-grip-azure px-5">
            <div className="flex gap-x-4">
              <Social
                facebook={facebook}
                instagram={instagram}
                linkedin={linkedin}
                className="fill-grip-midnight transition-all hover:fill-grip-social-hover"
              />
            </div>
            <a
              href="#"
              className={clsx(" ml-auto h-5 w-5 transition-opacity", {
                "pointer-events-none opacity-0": !openForm,
                "opacity-100": openForm,
              })}
              onClick={(event) => {
                event.preventDefault();
                setOpenForm(false);
              }}
            >
              <Close className="fill-grip-midnight" />
            </a>
          </div>
          <MobileForm isOpen={openForm} />
          <div className="relative z-0 h-full">
            <div className="relative z-30 px-8 pt-32 text-white md:w-7/12 md:px-12 md:px-16 md:pt-40 lg:w-full">
              <h3 className="mb-6">{title}</h3>
              <div className="mb-3 text-sm">
                <PortableText value={body} />
              </div>
              {cta && (
                <Button
                  onClick={() => setOpenForm(true)}
                  variant="cta"
                  className="dark mb-10"
                  icon="arrow-right"
                >
                  {cta}
                </Button>
              )}
            </div>

            <div className="absolute left-0 right-0 bottom-0 z-20 w-full bg-grip-azure py-6 px-5 text-white">
              <ul className="flex w-full justify-center gap-x-10 text-sm text-grip-midnight underline-offset-2">
                {footer.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      className="cursor-pointer underline"
                      href={`/pages/${item.slug}`}
                      onClick={handleFooterLink}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute bottom-[72px] right-0 w-full bg-grip-midnight">
              <MobileShapes className="hidden h-full w-full md:block" />
              <Shapes className="block w-full md:hidden " />
              <div className={clsx("block w-full md:hidden")}>
                <Shapes className="shapes absolute right-0 bottom-0 z-10 block " />
                <div className="absolute bottom-0 z-20 block w-full pl-[57%] pr-[8%] pb-[17%] xl:pr-[7%] ">
                  <Logo className="block w-full " />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <div
        className={clsx(
          "bottom-mobile-nav",
          currentIndex >= 0 && !inView ? "active" : "",
          {
            open: menuOpen,
          },
          {
            "form-open": mobileFormOpen,
          }
        )}
      >
        <MobileBottomNav social={social} />
      </div>
      {/*Initial top Slide*/}
      <div
        className={clsx("top-mobile-menu ", currentIndex < 0 ? "active" : "", {
          "form-open": mobileFormOpen,
        })}
      >
        <MobileBottomNav social={social} />
      </div>
      <BottomMobileMenu settings={settings} />
    </>
  );
};

export default HomePage;
