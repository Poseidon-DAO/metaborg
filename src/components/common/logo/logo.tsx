import { Box } from "@chakra-ui/react";
import { Image } from "components/common";

import type { NextPage } from "next";

import logo from "../../../../public/assets/logo.png";

const Logo: NextPage = () => {
  return (
    <Box w={[100, 200]} h={[50, 100]} position={"relative"}>
      <Image src={logo} alt="logo" layout="fill" objectFit="contain" priority />
    </Box>
  );
};

export { Logo };
