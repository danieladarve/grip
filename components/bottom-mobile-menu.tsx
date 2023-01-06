import { PortableText } from "@portabletext/react";
import Button from "@/components/button";
import MobileShapes from "@/components/svg/mobile-shapes";
import Link from "next/link";
import React from "react";
import { useGripStore } from "../store/grip-slice";
import type { Settings } from "@/lib/sanity/groq";
import clsx from "clsx";
import MobileForm from "@/components/mobile-form";

const BottomMobileMenu = ({ settings }: { settings: Settings }) => {
  const { menuOpen, setMobileFormOpen, setMenuOpen } = useGripStore();

  const { side, footer } = settings;
  const { body, cta, title } = side;

  const handleFooterLink = () => {
    setMobileFormOpen(false);
    setMenuOpen();
  };
  return (
    <div className={clsx("inner-footer relative", { open: menuOpen })}>
      <MobileForm />
      <div className="relative h-full ">
        <div className="relative z-30 px-16 pt-[20%] text-white">
          <h3 className="mb-6">{title}</h3>
          <div className="mb-3 text-sm">
            <PortableText value={body} />
          </div>
          {cta && (
            <Button
              onClick={() => setMobileFormOpen(true)}
              variant="cta"
              className="dark mb-10"
              icon="arrow-right"
            >
              {cta}
            </Button>
          )}
        </div>

        <div className="fixed left-0 right-0 bottom-0 z-20 w-full bg-grip-azure py-6 px-5 text-white">
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
        <div className="fixed bottom-[72px] left-0 right-0 w-full bg-grip-midnight">
          <MobileShapes className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default BottomMobileMenu;
