import { Dispatch, SetStateAction, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { AudioButton, Logo, Navbar, SocialLinks } from "components/landing";

import type { NextPage } from "next";

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
      <Box w="100%" position="fixed" p={5} zIndex={10}>
        <Flex
          w="7xl"
          my={0}
          mx="auto"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <AudioButton
              videoSound={videoSound}
              toggleVideoSound={toggleVideoSound}
            />
            <Logo />
            <Navbar />
          </Flex>

          <SocialLinks />
          {/* <HamburgerMenu /> */}
        </Flex>
      </Box>

      {renderHero?.({ videoSound, toggleVideoSound })}
    </>
  );
};

export { Header };
