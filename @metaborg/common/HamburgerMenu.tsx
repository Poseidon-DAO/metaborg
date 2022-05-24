import type { NextPage } from "next";

const HamburgerMenu: NextPage = () => {
  return (
    <div className="block md:hidden">
      <div className=" w-6 h-1 bg-red rounded-sm my-1"></div>
      <div className="w-6 h-1 bg-red rounded-sm my-1"></div>
      <div className="w-6 h-1 bg-red rounded-sm my-1"></div>
    </div>
  );
};

export { HamburgerMenu };
