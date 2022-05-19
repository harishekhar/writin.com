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
  | "dark"
  | "light";

export type ButtonTypeOf = "regular" | "google" | "linkedin" | "twitter";

export type ButtonStyleProps = {
  /** How large should the button be? */
  size?: ButtonSize;
  /** Which variant of the button should it have? */
  state?: ButtonVariant;

  /** Either it is social or regular button */
  typeOf?: ButtonTypeOf;
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
      typeOf = "regular",
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
      classNames,
      typeOf,
      ...props
    },
    ref
  ) => {
    let classes = cx(
      classNames,
      "rounded-md",
      "hover:-translate-y-1",
      "transition-all",
      "duration-500",
      "font-semibold",
      {
        ["w-full"]: isFullWidth,
        ["text-white"]: state == "primary",
        ["bg-primary"]: state == "primary",
        ["border"]: state == "light",
        ["text-neutral"]: state == "light",
      }
    );
    console.log(iconType);

    // debugger;

    return (
      <button ref={ref} className={classes} {...props}>
        <div className="flex justify-around content-center	">
          <div className="">
            {isLoading && <Icon iconType={IconType.SPINNER} size={size} />}
            {iconType && <Icon iconType={iconType} size={iconSize} />}
          </div>
          <div className="flex">
            {iconType ? <span>{children}</span> : children}
          </div>
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";
SocialButton.displayName = "SocialButton";
