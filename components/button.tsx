import clsx from "clsx";
import React from "react";
import { LoadingSpinner } from "./loading";
import ArrowDown from "@/components/svg/arrow-down";

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonVariant = "primary" | "secondary" | "cta";

export type IconVariant = "arrow-right" | "arrow-down";

type ButtonStyle = {
  disabled?: boolean;
  variant?: ButtonVariant;
  icon?: IconVariant;
};

export type ButtonProps = {
  loading?: boolean;
  children?: React.ReactNode;
} & ButtonStyle;

export const getButtonClasses = (
  style: ButtonStyle = {},
  ...rest: string[]
) => {
  const { disabled, variant = "secondary" } = style;
  return clsx(
    variant !== "cta" ? "button-3d" : "cta",
    disabled && "pointer-events-none",
    variant,
    ...rest
  );
};

const ButtonContent: React.FC<{
  loading?: boolean;
  children?: React.ReactNode;
  icon?: IconVariant;
}> = ({ loading, icon, children }) => {
  return (
    <React.Fragment>
      <span className="flex items-center">
        {loading && (
          <span className="mr-3">
            <LoadingSpinner className="h-5 w-5" />
          </span>
        )}
        <span>{children}</span>
        {icon && (
          <ArrowDown
            className={`icon ml-2 fill-current  ${
              icon === "arrow-right" ? "-rotate-90" : ""
            }`}
          />
        )}
      </span>
    </React.Fragment>
  );
};

/**
 * Button component that renders a `<button>` element
 *
 * @see {@link ButtonLink} for rendering an `<a>` element
 */
export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & HTMLButtonProps
>((props, ref) => {
  const { className = "", disabled, variant, ...rest } = props;
  return (
    <button
      className={getButtonClasses({ disabled, variant }, className)}
      ref={ref}
      type="button"
      aria-disabled={disabled}
      {...rest}
      disabled={disabled}
    >
      <ButtonContent {...props} />
    </button>
  );
});

Button.displayName = "Button";

export default Button;
