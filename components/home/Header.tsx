import type { NextPage } from "next";

import { AudioButton, HamburgerMenu, Logo, SocialLinks } from "@metaborg";
import { Navbar } from "@metaborg/Navbar";

const Header: NextPage = () => {
  return (
    <header className="p-5 w-full fixed">
      <div className="w-full lg:max-w-7xl mx-auto my-0 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <AudioButton />
          <Logo />
          <Navbar />
        </div>

        <SocialLinks />
        <HamburgerMenu />
      </div>
    </header>
  );
};

export { Header };
