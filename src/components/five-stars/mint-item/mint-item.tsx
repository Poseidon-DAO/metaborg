import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { NextPage } from "next";

interface IMintItem {
  id: string;
  amount: number;
  imageUrl: string;
}

const MintItem: NextPage<IMintItem> = ({ amount, imageUrl }) => {
  return (
    <Flex my={14} justifyContent="space-between" alignItems="center">
      <Box w={800} border="1px solid green">
        <Image src={imageUrl} alt="nft to mint" />
      </Box>

      <Box border="1px dotted" borderColor="brand.red" w="100%" h="1px" />

      <Box textAlign="right">
        <Button minW="240px" size="xl" flexDir="column">
          <Heading color="brand.red">MINT</Heading>
          <Text>
            {amount} NFT{amount > 1 ? "S" : ""}
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export { MintItem };
