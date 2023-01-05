import clsx from "clsx";
import type { SvgProps } from "@/components/svg/logo";

const RegionalBreakdown = ({ className }: SvgProps) => {
  return (
    <svg
      className={clsx(className)}
      viewBox="0 0 299 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96.0677 261.354C18.6093 235.944 -14.2511 156.76 5.71792 92.776C26.3904 26.5385 95.1775 -17.3231 175.559 6.61339L96.0677 261.354Z"
        fill="#FCE896"
      />
      <path
        d="M162.26 62.8572C243.774 64.0441 298.724 129.842 298.724 196.871C298.724 266.252 246.125 328.609 162.26 329.708L162.26 62.8572Z"
        fill="#F35540"
      />
    </svg>
  );
};

export default RegionalBreakdown;
