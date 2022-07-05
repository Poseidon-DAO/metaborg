/* eslint-disable @next/next/no-img-element */
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { Image, Line } from "components/common";
import { useDistributionMetadata, useMint } from "lib/hooks";
import type { NextPage } from "next";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useStore } from "store/store";
import { getDefaultToastConfig } from "utils/toast";

import metaborgMix from "../../../../public/assets/editions/METABORGMIX.jpg";
import metamaskLogo from "../../../../public/assets/metamask-logo.png";

interface IMintSectionProps {
  availableMints: string | number;
}

const MintSection: NextPage<IMintSectionProps> = ({ availableMints }) => {
  const [fetchMetaData, setFetchMetaData] = useState(false);
  const { isAuthenticated } = useMoralis();
  const toast = useToast();

  const distributionPrice = useStore(
    (state) => state.distributionMetaData.formatedData.price
  );
  const setDistributionMetaData = useStore(
    (state) => state.setDistributionMetaData
  );

  const { fetch, isFetching, isLoading } = useMint({
    salePrice: distributionPrice,
  });

  useDistributionMetadata({
    onSuccess: (data) => setDistributionMetaData(data),
    enabled: !!fetchMetaData,
    deps: [fetchMetaData],
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
        toast(
          getDefaultToastConfig({
            title: "You have successfully minted the NFT",
            status: "success",
          })
        );
      },
      onError: (error) => {
        console.error(error);
        toast(
          getDefaultToastConfig({
            title: "There was an error with NFT minting",
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
            isLoading={isLoading || isFetching}
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
