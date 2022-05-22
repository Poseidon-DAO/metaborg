import { useState } from "react";

import { AudioButton, HamburgerMenu, Logo, SocialLinks } from "@metaborg";
import { Navbar } from "@metaborg/Navbar";

import type { NextPage } from "next";
import type { Dispatch, SetStateAction } from "react";

interface IHeaderProps {
  renderHero?: ({
    videoSound,
    toggleVideoSound,
  }: {
    videoSound: boolean;
    toggleVideoSound: Dispatch<SetStateAction<boolean>>;
  }) => JSX.Element;
}

const Header: NextPage<IHeaderProps> = ({ renderHero }) => {
  const [videoSound, setVideoSound] = useState(false);

  const toggleVideoSound = () => setVideoSound((prevState) => !prevState);

  return (
    <>
      <header className="p-5 w-full fixed z-10">
        <div className="w-full lg:max-w-7xl mx-auto my-0 flex justify-between items-center">
          <div className="flex justify-between items-center">
            <AudioButton
              videoSound={videoSound}
              toggleVideoSound={toggleVideoSound}
            />
            <Logo />
            <Navbar />
          </div>

          <SocialLinks />
          <HamburgerMenu />
        </div>
      </header>

      {renderHero?.({ videoSound, toggleVideoSound })}
    </>
  );
};

export { Header };
