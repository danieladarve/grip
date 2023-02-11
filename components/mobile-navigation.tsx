import { useGripStore } from "../store/grip-slice";
import ArrowDown from "@/components/svg/arrow-down";
import clsx from "clsx";
import { handleIntoView } from "@/components/desktop-navigation";

const MobileNavigation = () => {
  const { sections, currentIndex } = useGripStore();

  return (
    <>
      {sections.length && currentIndex >= 0 && (
        <div className="navigation mobile-nav-ul">
          <ul className="flex w-full text-sm">
            <li className="active w-1/2 text-grip-midnight/40">
              <a
                href="#"
                className="flex w-full items-center"
                aria-label={`Go to ${sections[currentIndex].section.menuTitle}`}
                onClick={(event) => event.preventDefault()}
              >
                <span>{sections[currentIndex].section.menuTitle}</span>
                {sections[currentIndex + 1] && (
                  <span className="w-3">
                    <ArrowDown className="-rotate-90 fill-current" />
                  </span>
                )}
              </a>
            </li>
            <li
              className={clsx(
                "w-1/2 text-grip-midnight/40 ",
                sections.length === currentIndex + 1 ? "is-last" : ""
              )}
            >
              <a
                href="#"
                className={"flex w-full items-center"}
                aria-label={`Go to next section`}
                onClick={(event) => {
                  event.preventDefault();
                  if (sections.length === currentIndex + 1) {
                    handleIntoView(event, `.main-${sections[0].id}`);
                  } else {
                    handleIntoView(
                      event,
                      `.main-${sections[currentIndex + 1].id}`
                    );
                  }

                  console.log(currentIndex, sections[currentIndex + 1]);
                  // if (!sections[currentIndex + 1]) {
                  //   event.preventDefault();
                  //   handleScroll();
                  // } else {
                  //   const offset = getElementOffset(sections, currentIndex);
                  //   handleScroll(offset);
                  // }
                }}
              >
                <span
                  className={clsx(
                    "pl-5",
                    sections[currentIndex + 1]
                      ? "text-grip-midnight"
                      : "text-grip-midnight/40",
                    sections.length === currentIndex + 1 ? "animate-bounce" : ""
                  )}
                >
                  {sections[currentIndex + 1]?.section?.menuTitle ??
                    "Back to start"}
                </span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default MobileNavigation;
