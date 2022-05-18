import React from "react";
import cx from "classnames";

import { Icon, IconSize, IconType } from "components";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "tertiary-link"
  | "custom"
  | "dark";

export type ButtonStyleProps = {
  /** How large should the button be? */
  size?: ButtonSize;
  /** Which variant of the button should it have? */
  state?: ButtonVariant;
  /** has dark background? */
  hasDarkBg?: boolean;
  /** Does this button cover 100% width of its parent? (100%) */
  isFullWidth?: boolean;
  /** Which optional icon to be rendered before the children node? */
  iconType?: IconType;
  /** What is the size of icon? */
  iconSize?: IconSize;
  /** isLoading? */
  isLoading?: boolean;
  /** is compact button? */
  isCompact?: boolean;

  classNames?: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleProps;

/**
 * A component to render button element of different sizes and states
 */
export const Button: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      size = "large",
      hasDarkBg = false,
      isFullWidth = false,
      state = "primary",
      isLoading = false,
      iconType,
      iconSize = "medium",
      isCompact = false,
      children,
      classNames,
      ...props
    },
    ref
  ) => {
    const classnames = cx(
      classNames,
      "rounded-md",
      "hover:bg-indigo-700",
      "hover:-translate-y-1",
      "transition-all",
      "duration-500",
      "font-semibold",
      {
        ["w-full"]: isFullWidth,
        ["bg-primary"]: state == "primary",
        ["text-white"]: state == "primary",
      }
    );

    return (
      <button ref={ref} className={classnames} {...props}>
        {isLoading && <Icon iconType={IconType.SPINNER} size={size} />}
        {iconType && <Icon iconType={iconType} size={iconSize} />}
        {iconType ? <span>{children}</span> : children}
      </button>
    );
  }
);
/**
 * A component to render button element of different sizes and states
 */
export const SocialButton: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      size = "large",
      hasDarkBg = false,
      isFullWidth = false,
      state = "primary",
      isLoading = false,
      iconType,
      iconSize = "medium",
      isCompact = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classnames = cx(className);

    return (
      <button ref={ref} className={classnames} {...props}>
        {isLoading && <Icon iconType={IconType.SPINNER} size={size} />}
        {iconType && <Icon iconType={iconType} size={iconSize} />}
        {iconType ? <span>{children}</span> : children}
      </button>
    );
  }
);

Button.displayName = "Button";
SocialButton.displayName = "SocialButton";
