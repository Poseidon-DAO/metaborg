/* eslint-disable @next/next/no-img-element */
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Line } from "components/common";

import type { NextPage } from "next";

export interface INftItemProps {
  contractAddress: string;
  tokenId: string;
  name: string;
  image: string;
  creator: {
    username: string;
    name: string;
    profilePicUrl: string;
  };
  owner: {
    username: string;
    name: string;
    profilePicUrl: string;
  };
}

const NftItem: NextPage<INftItemProps> = ({ name, image }) => {
  return (
    <Box mb={20}>
      <Flex justifyContent="space-between" mb={10}>
        <Box w={"45%"} minH={400} pos="relative">
          <img src={image} alt={`${name} nft`} />
        </Box>

        <Flex
          w="45%"
          flexDir="column"
          justifyContent="space-around"
          alignItems="center"
          textAlign="center"
        >
          <Heading size="lg">
            Congratulations <br />
            You have collected <br /> &quot;{name}&quot;
          </Heading>

          <Heading size="lg">
            NOW <br /> you can mint your <br /> NFT Metaborg Manga <br /> Issue
            #01
          </Heading>

          <Button size="lg">MINT NOW</Button>
        </Flex>
      </Flex>

      <Line />
    </Box>
  );
};

export { NftItem };
