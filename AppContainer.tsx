import type { NextPage } from "next";

interface IAppContainer {
  children: React.ReactNode;
}

const AppContainer: NextPage<IAppContainer> = ({ children }) => {
  return <>{children}</>;
};

export { AppContainer };
