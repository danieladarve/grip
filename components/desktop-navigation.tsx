import { useGripStore } from "../store/grip-slice";
import ArrowDown from "@/components/svg/arrow-down";
import clsx from "clsx";

export const handleIntoView = (event, id) => {
  event.preventDefault();
  document
    .querySelector(id)
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
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
        <li className="">
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
            <span>Back to top</span>
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
              <span
                className={clsx(
                  "pt-3",
                  section.section._id === current ? "opacity-100" : "opacity-0"
                )}
              >
                <ArrowDown className="w-2 fill-current" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
