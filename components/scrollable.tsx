import type { ReactNode } from "react";
import { forwardRef } from "react";
import clsx from "clsx";

interface ScrollableProps {
  children?: ReactNode;
  className?: string;
}

type Ref = HTMLDivElement;

const Scrollable = forwardRef<Ref, ScrollableProps>(
  ({ children, className, ...rest }, ref) => (
    <section
      className={clsx("scrollable-section", className)}
      ref={ref}
      {...rest}
    >
      {children}
    </section>
  )
);

Scrollable.displayName = "Scrollable";

export default Scrollable;
