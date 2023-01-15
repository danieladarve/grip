import type { SvgProps } from "@/components/svg/logo";
import clsx from "clsx";

const Close = ({ className }: SvgProps) => {
  return (
    <svg
      width="18"
      height="18"
      className={clsx(className)}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.725 3.505L14.8431 0.625L9.175 6.295L3.50688 0.625L0.625 3.505L6.295 9.175L0.625 14.8431L3.50688 17.725L9.175 12.055L14.8431 17.725L17.725 14.8431L12.055 9.175L17.725 3.505Z" />
    </svg>
  );
};

export default Close;
