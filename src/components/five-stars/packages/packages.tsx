import { Box, Text } from "@chakra-ui/react";

const Packages = () => {
  return (
    <Box
      textAlign="center"
      fontWeight="extrabold"
      fontSize={["medium", "large"]}
      px={[3, "initial"]}
    >
      <Box mb={8}>
        <Text>You can choose from 3 different NFTs packages</Text>
      </Box>

      <Box lineHeight="1.2">
        <Text>1 NFT pack = random ArtPage</Text>
        <Text>3 NFTs pack = at least one 3 or 4 stars ArtPage</Text>
        <Text>5 NFTs pack = at least one 4 or 5 stars ArtPage</Text>
      </Box>
    </Box>
  );
};

export { Packages };
