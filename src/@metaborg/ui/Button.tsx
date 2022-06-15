import type { NextPage } from "next";
import type { ComponentProps } from "react";

type Variants = "contained" | "outlined" | "text";
type Sizes = "small" | "medium" | "large";

interface IButtonProps extends ComponentProps<"button"> {
  variant?: Variants;
  className?: string;
  size?: Sizes;
  children: React.ReactNode;
  href?: ComponentProps<"a">["href"];
  target?: ComponentProps<"a">["target"];
}

const variants: Record<Variants, string> = {
  contained: "bg-red text-white",
  outlined: "bg-transparent text-red text-white border-red border-2",
  text: "bg-transparent text-white",
};

const sizes: Record<
  Sizes,
  { width: number; height: number; fontSize: number }
> = {
  small: { width: 194, height: 34, fontSize: 14 },
  medium: { width: 233, height: 73, fontSize: 20 },
  large: { width: 293, height: 103, fontSize: 24 },
};

const Button: NextPage<IButtonProps> = ({
  variant = "contained",
  className,
  children,
  size = "medium",
  ...props
}) => {
  const { href, target } = props;

  return (
    <button
      className={`${variants[variant]} ${className}`}
      style={{ ...sizes[size] }}
    >
      {href ? (
        <a href={href} target={target} className="transparent">
          {children}
        </a>
      ) : (
        children
      )}
    </button>
  );
};

export { Button };
