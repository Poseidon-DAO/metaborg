import { type NextPage } from "next";
import { DropLayout } from "layout/drop";
import {
  Box,
  Center,
  Container,
  Heading,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { ConnectWallet } from "components/drop/connect-wallet";
import { Line } from "components/common/line";
import { Strips } from "components/common/strips";
import { useMoralis } from "react-moralis";

const Drop: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  return (
    <DropLayout>
      <Container centerContent>
        <Box maxW="xl">
          <Heading textAlign="center" size="2xl">
            Welcome fighter collector, let us verify your enrollment
          </Heading>
        </Box>

        <Box>
          <Spacer mt={4} />
        </Box>

        <Box>
          <Strips />
          <ConnectWallet />
        </Box>
      </Container>
    </DropLayout>
  );
};

export default Drop;
