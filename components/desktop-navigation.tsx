import { useGripStore } from "../store/grip-slice";
import ArrowDown from "@/components/svg/arrow-down";
import clsx from "clsx";

export const handleIntoView = (event, id) => {
  event.preventDefault();
  const element: HTMLDivElement = document.querySelector(id);
  document.querySelector(".main").scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  });
};
const DesktopNavigation = () => {
  const { sections, currentIndex, current } = useGripStore();

  return (
    <nav
      className={clsx(
        "desktop-nav navigation",
        currentIndex >= 0 ? "active" : ""
      )}
    >
      <ul className="flex h-full flex-col justify-between text-xs">
        <li className="text-grip-midnight/40">
          <a
            className="cursor-pointer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(".main").scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Back to top
          </a>
        </li>
        {sections.map((section, i) => (
          <li
            className={clsx(
              "text-center",
              section.section._id === current ? "active" : ""
            )}
            key={i}
          >
            <a
              href="#"
              className=""
              onClick={(event) => handleIntoView(event, `.main-${section.id}`)}
            >
              <span>{section.section.menuTitle}</span>
              {section.section._id === current && (
                <span className="pt-5">
                  <ArrowDown className="fill-current" />
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
