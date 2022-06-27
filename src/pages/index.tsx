import { useMoralis } from "react-moralis";
import { DropLayout } from "layout/drop";
import { Box, Container, Heading } from "@chakra-ui/react";
import { Strips } from "components/common";
import { ConnectWallet, NftsList, Editions } from "components/drop";

import aloneEdition from "../../public/assets/editions/Alone.jpg";
import alwaysEdition from "../../public/assets/editions/Always.jpg";

import { type NextPage } from "next";
import { useRouter } from "next/router";

const nftsMock = [
  {
    contractAddress: "0x8c167a1dbf8e19d18705382d6a457491589f9598",
    tokenId: "33400030081",
    name: "YOU RESPECTED ME #81/100",
    image: aloneEdition.src,
    creator: {
      username: "billelis",
      name: "Billelis",
      profilePicUrl:
        "https://res.cloudinary.com/nifty-gateway/image/upload/v1606249630/aekrzlaq22zxnyvairbo.jpg",
    },
    owner: {
      username: "tommy",
      name: "tommyk.eth",
      profilePicUrl:
        "https://res.cloudinary.com/nifty-gateway/image/upload/v1625617848/uiflc4iaky3k6hh8nrqh.png",
    },
  },
  {
    contractAddress: "0xc92ceddfb8dd984a89fb494c376f9a48b999aafc",
    tokenId: "3152",
    name: "Creature #3152",
    image: alwaysEdition.src,
    creator: {
      username: "creatureworld",
      name: "Creature World",
      profilePicUrl:
        "https://res.cloudinary.com/nifty-gateway/image/upload/v1630692687/wtalars9l78kggjfqeqt.jpg",
    },
    owner: {
      username: "tommy",
      name: "tommyk.eth",
      profilePicUrl:
        "https://res.cloudinary.com/nifty-gateway/image/upload/v1625617848/uiflc4iaky3k6hh8nrqh.png",
    },
  },
];

const Drop: NextPage = () => {
  const { query, push } = useRouter();
  const { isAuthenticated } = useMoralis();

  console.log("vigan query", {
    query,
  });

  return (
    <DropLayout>
      {!isAuthenticated && (
        <Container my={10} centerContent>
          <Box maxW="xl">
            <Heading textAlign="center" size="2xl">
              Welcome fighter collector, let us verify your enrollment
            </Heading>
          </Box>

          <Box my={8}>
            <Strips />
            <ConnectWallet />
          </Box>
        </Container>
      )}

      {isAuthenticated && (
        <Box mt={10} mb={20}>
          <NftsList nfts={nftsMock} />
        </Box>
      )}

      <Box mt={40}>
        <Editions />
      </Box>
    </DropLayout>
  );
};

export default Drop;
