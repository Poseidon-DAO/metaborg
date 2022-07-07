/* eslint-disable @next/next/no-img-element */
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { Image, Line } from "components/common";
import { useDistributionMetadata, useMint } from "lib/hooks";
import { useDistributionIndex } from "lib/hooks/use-distribution-index";
import type { NextPage } from "next";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useStore } from "store/store";
import { DistributionMetaData } from "store/types";
import { getDefaultToastConfig } from "utils/toast";

import metaborgMix from "../../../../public/assets/editions/METABORGMIX.jpg";
import metamaskLogo from "../../../../public/assets/metamask-logo.png";

interface IMintSectionProps {
  distributionMetadata: DistributionMetaData;
  availableMints: string | number;
  onMintSuccess?: () => void;
  isLoading?: boolean;
}

const MintSection: NextPage<IMintSectionProps> = ({
  availableMints,
  distributionMetadata,
  onMintSuccess,
  isLoading = false,
}) => {
  const [fetchMetaData, setFetchMetaData] = useState(false);
  const { isAuthenticated } = useMoralis();
  const toast = useToast();

  const distributionPrice = distributionMetadata.formatedData.price;

  const { index } = useDistributionIndex({
    enabled: true,
  });

  const {
    fetch,
    isFetching,
    isLoading: mintLoading,
  } = useMint({
    salePrice: distributionPrice,
    mangaDistributionID: index,
  });

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
        setFetchMetaData(true);
        onMintSuccess?.();
        toast(
          getDefaultToastConfig({
            title: "Verifing Transaction...",
            status: "info",
            duration: 4000,
          })
        );
      },
      onError: (error) => {
        toast(
          getDefaultToastConfig({
            title:
              `${error.stack?.substring(0, 40)}...` ||
              "There was a problem minting your NFT!",
            status: "error",
          })
        );
      },
    });
  }

  return (
    <Box mb={40}>
      <Flex
        direction={["column", "row"]}
        justifyContent="space-between"
        mb={10}
      >
        <Box w={["full", "45%"]} minH={[300, 400]} pos="relative">
          <img src={metaborgMix.src} alt="Metaborg mix" />
        </Box>

        <Flex
          w={["full", "45%"]}
          mt={[4]}
          flexDir="column"
          justifyContent="space-around"
          alignItems="center"
          textAlign="center"
        >
          <Box>
            <Heading size={["md", "lg"]}>
              Congratulations, <br /> you are eligible for minting{" "}
              {availableMints} <br />
              NFT Metaborg Manga <br /> Issue #01
            </Heading>
          </Box>

          <Button
            mt={[4]}
            size={["md", "lg"]}
            onClick={onMintClick}
            disabled={!isAuthenticated || !availableMints}
            isLoading={isLoading || isFetching || mintLoading}
          >
            MINT NOW
          </Button>
        </Flex>
      </Flex>

      <Box mt={20}>
        <Line />
      </Box>
    </Box>
  );
};

export { MintSection };
