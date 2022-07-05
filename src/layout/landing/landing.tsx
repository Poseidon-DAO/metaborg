import { type ReactNode } from "react";
import { type NextPage } from "next";

interface ILandingLayoutProps {
  children?: ReactNode;
}

const LandingLayout: NextPage<ILandingLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export { LandingLayout };
