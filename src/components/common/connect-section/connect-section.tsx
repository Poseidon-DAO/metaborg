import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Strips } from "components/common";

import { type NextPage } from "next";
import { useAccount, useConnect } from "wagmi";
interface IConnectSection {
  title: string;
}

const ConnectSection: NextPage<IConnectSection> = ({ title }) => {
  return (
    <Container centerContent>
      <Box maxW="xl">
        <Heading textAlign="center" size={["lg", "2xl"]}>
          {title}
        </Heading>
      </Box>

      <Box my={[4, 8]}>
        <Strips />
        <ConnectButton />
      </Box>
    </Container>
  );
};

export { ConnectSection };
