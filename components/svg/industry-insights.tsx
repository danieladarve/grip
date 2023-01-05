import type { SvgProps } from "@/components/svg/logo";
import clsx from "clsx";

const IndustryInsights = ({ className }: SvgProps) => {
  return (
    <svg
      className={clsx(className)}
      viewBox="0 0 569 506"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M109.569 501.295L416.94 408.993L187.586 91.8075L26.9473 353.729L109.569 501.295Z"
        fill="#FCE896"
      />
      <path
        d="M47.4093 338.002C87.8769 316.309 140.83 327.753 165.705 374.169C192.096 423.408 172.336 473.841 131.868 495.534C92.7648 516.488 37.0272 504.741 11.375 456.904C-15.0161 407.684 7.62378 359.316 47.4093 338.002Z"
        fill="#F35540"
      />
      <path
        d="M264.73 24.6802C359.022 -25.8854 482.414 0.789889 540.406 108.95C601.922 223.684 555.847 341.221 461.555 391.768C370.446 440.609 240.537 413.233 180.783 301.758C119.286 187.062 172.068 74.3742 264.749 24.6802H264.73Z"
        fill="#DBE8F4"
      />
    </svg>
  );
};

export default IndustryInsights;
