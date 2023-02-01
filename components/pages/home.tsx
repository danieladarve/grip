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
      </section>
      <div
        className={clsx(
          "bottom-mobile-nav",
          currentIndex >= 0 && !inView ? "active" : "",
          {
            "open overflow-y-hidden": menuOpen,
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
      <BottomMobileMenu social={social} settings={settings} />
    </>
  );
};

export default HomePage;
