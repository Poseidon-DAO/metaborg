import { Box } from "@chakra-ui/react";

import { Image } from "components/common";

const Logo = () => {
  return (
    <Box w={36} mx={6}>
      <Image
        src="https://metaborg.io/wp-content/uploads/2022/01/metaborg-logo-bianco_ok.png"
        alt="logo"
        width={150}
        height="70%"
      />
    </Box>
  );
};

export { Logo };
