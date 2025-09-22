import { Component, JSX } from "solid-js";


/**
 * A reusable button component with customizable styles.
 * 
 *  classes used so far:
 * btn btn-sm btn-square btn-ghost hover:btn-primary flex-none
 * btn btn-square btn-ghost btn-sm hover:btn-warning join-item
 */



type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const Button: Component<ButtonProps> = (props) => {
  const { children, variant, size, ...rest } = props;

  const btnClasses = () => ({
    "btn btn-square btn-ghost hover:btn-primary": true,
    "btn-sm": props.size === "sm",
    "btn-md": props.size === "md",
    "btn-lg": props.size === "lg",
    "btn-primary": props.variant === "primary",

    "btn-secondary": props.variant === "secondary",
    "btn-ghost hover:btn-primary": props.variant === "ghost" || !props.variant,

  });

  return (<button
    classList={btnClasses()}
    {...rest}
  >
    {children}
  </button>);
}

