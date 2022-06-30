/* eslint-disable @next/next/no-img-element */
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { Image, Line } from "components/common";
import { Nifty, NiftyNames } from "lib/api/types";
import { useStore } from "store/store";

import type { NextPage } from "next";
import { StaticImageData } from "next/image";
import { useMoralis } from "react-moralis";
import { getDefaultToastConfig } from "utils/toast";

import aloneImage from "../../../../public/assets/editions/Alone.jpg";
import alwaysImage from "../../../../public/assets/editions/Always.jpg";
import neverNextImage from "../../../../public/assets/editions/Never_Next.png";
import metamaskLogo from "../../../../public/assets/metamask-logo.png";
import { useMint } from "lib/hooks";
import { useAvailableMints } from "lib/hooks/use-available-mints";

export interface INftItemProps extends Nifty {}

const imageForEdition: Record<NiftyNames, StaticImageData> = {
  ALONE: aloneImage,
  ALWAYS: alwaysImage,
  "NEVER NEXT": neverNextImage,
};

const NftItem: NextPage<INftItemProps> = ({ name }) => {
  const distributionPrice = useStore((state) => state.distributionPrice);
  const { isAuthenticated, user } = useMoralis();
  const { availableMints } = useAvailableMints({
    _mangaDistributionID: "1",
    _address: user?.get("ethAddress"),
  });
  const { fetch } = useMint({ salePrice: distributionPrice });
  const toast = useToast();

  async function onMintClick() {
    if (!isAuthenticated)
      return toast(
        getDefaultToastConfig({
          title: "Please connect Metamsk in order to mint NFT-s",
          icon: (
            <Image
              width={30}
              height={30}
              src={metamaskLogo}
              alt="metamask logo"
              priority
            />
          ),
        })
      );

    await fetch({
      onSuccess: () => {
        toast(
          getDefaultToastConfig({
            title: "You have successfully minted the NFT",
          })
        );
      },
      onError: (error) => {
        console.error("Error", error);
      },
    });
  }

  return (
    <Box mb={20}>
      <Flex justifyContent="space-between" mb={10}>
        <Box w={"45%"} minH={400} pos="relative">
          <img src={imageForEdition[name].src} alt={`${name} nft`} />
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

          <Button size="lg" onClick={onMintClick} disabled={!availableMints}>
            MINT NOW
          </Button>
        </Flex>
      </Flex>

      <Line />
    </Box>
  );
};

export { NftItem };
