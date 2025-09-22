import { Component, JSX } from "solid-js";


/**
 * A reusable button component with customizable styles.
 * 
 *  classes used so far:
 * btn btn-sm btn-square btn-ghost hover:btn-primary flex-none
 * btn btn-square btn-ghost btn-sm hover:btn-warning join-item
 * 
 * Not in use thought because I cannot find any benefits for this application.
 * 
 */


const VariantClasses: Record<ButtonProps["variant"], string> = {
  squareGhost: 'btn-square btn-ghost hover:btn-primary',
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost hover:btn-primary",
};

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary" | "ghost" | "squareGhost";
  size?: "sm" | "md" | "lg";
};

const Button: Component<ButtonProps> = (props) => {
  const { children, variant, size, ...rest } = props;

  const getVariantClasses = () => {
    return VariantClasses[variant];
  };

  const btnClasses = () => ({
    "btn": true,
    "btn-sm": size === "sm",
    "btn-md": size === "md",
    "btn-lg": size === "lg",

  });

  return (<button
    class={getVariantClasses()}
    classList={btnClasses()}
    {...rest}
  >
    {children}
  </button>);
}

