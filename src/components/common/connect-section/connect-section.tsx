import { Box, Container, Heading } from "@chakra-ui/react";

import { ConnectWallet, Strips } from "components/common";

import { type NextPage } from "next";
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
        <ConnectWallet />
      </Box>
    </Container>
  );
};

export { ConnectSection };
