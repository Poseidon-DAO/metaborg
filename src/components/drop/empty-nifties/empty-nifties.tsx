import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Line } from "components/common";

const EmptyNifties = () => {
  return (
    <Flex flexDir="column" alignItems="center">
      <Box mb={60}>
        <Line />
      </Box>

      <Heading size="lg" textAlign="center">
        You haven&apos;t collected any NFTs in the Nifty Drop! <br /> Visit
        Nifty Gateway and join the drop now.
      </Heading>

      <Box width="min-content" mt={14}>
        <Button>Nifty Gateway</Button>
      </Box>

      <Box mt={60}>
        <Line />
      </Box>
    </Flex>
  );
};

export { EmptyNifties };
