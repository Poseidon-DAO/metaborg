import type { NextPage } from "next";

interface ITypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  children: React.ReactNode;
}

const Typography: NextPage<ITypographyProps> = ({
  variant: HtmlTextTag = "p",
  className,
  children,
}) => {
  return <HtmlTextTag className={className}>{children}</HtmlTextTag>;
};

export { Typography };
