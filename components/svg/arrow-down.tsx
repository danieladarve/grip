import type { SvgProps } from "@/components/svg/logo";
import clsx from "clsx";

const ArrowDown = ({ className }: SvgProps) => {
  return (
    <svg
      className={clsx(className)}
      viewBox="0 0 12 6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 6L12 9.53674e-07L-1.20797e-06 1.66869e-07L6 6Z" />
    </svg>
  );
};

export default ArrowDown;
