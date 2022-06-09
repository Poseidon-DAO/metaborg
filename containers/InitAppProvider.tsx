import type { NextPage } from "next";

interface IInitAppProviderProps {
  children: React.ReactNode;
}

const InitAppProvider: NextPage<IInitAppProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export { InitAppProvider };
