import { Box, Container, Heading } from "@chakra-ui/react";
import { ConnectWallet } from "components/drop";
import { NextPage } from "next";

import { Strips } from "../strips";

interface IConnectSection {
  title: string;
}

const ConnectSection: NextPage<IConnectSection> = ({ title }) => {
  return (
    <Container centerContent>
      <Box maxW="xl">
        <Heading textAlign="center" size={["xl", "2xl"]}>
          {title}
        </Heading>
      </Box>

      <Box my={[4, 8]}>
        <Strips />
        <ConnectWallet />
      </Box>
    </Container>
  );
};

export { ConnectSection };
