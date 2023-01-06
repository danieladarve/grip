import Social from "@/components/social";
import React from "react";
import { useGripStore } from "../store/grip-slice";
import type { SocialLinks } from "@/lib/sanity/groq";
import Close from "@/components/svg/close";

const MobileBottomNav = ({ social }: { social?: SocialLinks }) => {
  const { setMenuOpen, setMobileFormOpen, mobileFormOpen } = useGripStore();
  const handleMobileMenu = () => {
    if (mobileFormOpen) {
      setMobileFormOpen(false);
    }
    setMenuOpen();
  };
  return (
    <nav className="flex min-h-[72px] items-center justify-between py-6 lg:hidden">
      <div className="flex gap-x-4">
        <Social
          facebook={social.facebook}
          instagram={social.instagram}
          linkedin={social.linkedin}
          className="fill-grip-midnight"
        />
      </div>
      <div className="flex">
        {!mobileFormOpen ? (
          <button
            aria-label="Open Mobile Menu"
            className="block h-auto w-8 py-2.5"
            onClick={() => handleMobileMenu()}
          >
            <span className=" table h-1 w-full bg-grip-midnight"></span>
          </button>
        ) : (
          <a
            href="#"
            className=""
            aria-label="Close Menu"
            onClick={(event) => {
              event.preventDefault();
              handleMobileMenu();
            }}
          >
            <Close className="" />
          </a>
        )}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
