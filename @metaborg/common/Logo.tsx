import { ImageLinks, MBImage } from "@metaborg/common";

import type { NextPage } from "next";

const Logo: NextPage = () => {
  return (
    <div className="w-36 lg:w-48 mx-6">
      <MBImage src={ImageLinks.Logo} alt="logo" />
    </div>
  );
};

export { Logo };
