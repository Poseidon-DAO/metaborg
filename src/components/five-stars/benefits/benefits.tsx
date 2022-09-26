import { Box, Heading, Text, chakra, Flex } from "@chakra-ui/react";

const Benefits = () => {
  return (
    <Flex alignItems="center" flexDir="column">
      <Heading size="md" textAlign="center">
        BENEFITS
      </Heading>

      <Box lineHeight={[1.5, 3.5]} fontSize={["sm", "lg"]}>
        <Text> - Genesis drop fighter collectors will have a discount.</Text>
        <Text whiteSpace="pre-line" lineHeight="1.3">
          {" "}
          - Contest: {"\n"}{" "}
          <chakra.span pl={2}>
            all collectors will participate in the drawing of
          </chakra.span>
          {"\n"}
          <chakra.span pl={2}>
            one free Gold Metaborg Manga NFT Issue #1.
          </chakra.span>
        </Text>
        <Text>
          {" "}
          - You will enter the White list of the Metaborg
          &quot;Collectibles&quot;.
        </Text>
      </Box>
    </Flex>
  );
};

export { Benefits };
