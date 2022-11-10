import { Box, Button, Container, Heading } from "@chakra-ui/react";

import { Strips } from "components/common";

import { type NextPage } from "next";
import { useAccount, useConnect } from "wagmi";

interface IConnectSection {
  title: string;
}

const ConnectSection: NextPage<IConnectSection> = ({ title }) => {
  const { connect, connectors } = useConnect();

  function handleConnect() {
    connect({ connector: connectors[0] });
  }

  return (
    <Container centerContent>
      <Box maxW="xl">
        <Heading textAlign="center" size={["lg", "2xl"]}>
          {title}
        </Heading>
      </Box>

      <Box my={[4, 8]}>
        <Strips />
        <Button onClick={handleConnect} size={["lg", "xl"]}>
          Connect
        </Button>
      </Box>
    </Container>
  );
};

export { ConnectSection };
