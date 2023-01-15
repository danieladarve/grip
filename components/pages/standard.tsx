import type { Settings } from "@/lib/sanity/groq";
import { useGripStore } from "../../store/grip-slice";
import Link from "next/link";
import ArrowDown from "@/components/svg/arrow-down";
import Button from "@/components/button";
import SideContact from "@/components/side-contact";
import { PortableText } from "@portabletext/react";
import clsx from "clsx";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import BottomMobileMenu from "@/components/bottom-mobile-menu";
import React from "react";
import type { Page as PageType } from "@/lib/sanity/groq";

const StandardPage = ({
  page,
  settings,
}: {
  page: PageType;
  settings: Settings;
}) => {
  const { menuOpen, setMenuOpen, mobileFormOpen } = useGripStore();
  const { side, social, formSettings, formData, footer } = settings;
  const { body, cta, title, tryGripBeta } = side;

  return (
    <main className="pages relative h-full min-h-screen w-full overscroll-none bg-grip-coral scrollbar-hide">
      <div className="absolute top-6 left-6 right-6 md:top-8 md:right-14 md:left-16">
        <Link
          href="/"
          className="float-left mt-2.5 flex items-center text-grip-azure underline"
        >
          <span className="min-w-[100px]">Return Home</span>{" "}
          <ArrowDown className="ml-2 h-2 rotate-90 fill-current" />
        </Link>
        <div className="float-right hidden lg:inline-block">
          <Button onClick={() => setMenuOpen()} variant="primary">
            Try Grip Beta
          </Button>
        </div>
      </div>
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
      <div className="flex w-full flex-wrap px-6 pt-28 pb-32 md:pr-14 md:pl-16 lg:pb-12 lg:pt-40">
        <div className="mb-8 w-full border-b border-b-black pb-8 ">
          <h1 className="text-grip-azure">{page.title}</h1>
          <div className="h3 mt-8 w-full text-grip-midnight lg:mt-12 lg:w-1/2">
            <PortableText value={page.excerpt} />
          </div>
        </div>
        <div className="w-full">
          <div className="prose max-w-full lg:columns-2 lg:break-inside-avoid-page lg:gap-10">
            <PortableText value={page.body} />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "bottom-mobile-nav active",
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
      <BottomMobileMenu settings={settings} />
    </main>
  );
};

export default StandardPage;
