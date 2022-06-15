import type { NextPage } from "next";

interface ISpaceProps {
  width?: number;
  height?: number;
  className?: string;
}

const Spacer: NextPage<ISpaceProps> = ({
  width = 0,
  height = 0,
  className,
}) => {
  return <div className={className} style={{ width, height }} />;
};

export { Spacer };
