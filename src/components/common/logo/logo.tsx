import { type NextPage } from "next";
import { Image } from "components/common";
import { Box } from "@chakra-ui/react";

import logo from "../../../../public/assets/logo.png";

const Logo: NextPage = () => {
  return (
    <Box w={200} position={"relative"}>
      <Image src={logo} alt="logo" layout="fill" objectFit="cover" priority />
    </Box>
  );
};

export { Logo };
