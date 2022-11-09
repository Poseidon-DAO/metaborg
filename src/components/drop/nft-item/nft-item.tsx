/* eslint-disable @next/next/no-img-element */
import { StaticImageData } from "next/image";
import {
  Box,
  Button,
  Flex,
  Heading,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import { useStore } from "store/store";
import { Image, Line } from "components/common";
import { Nifty, NiftyNames } from "lib/api/types";
import { useMint } from "lib/hooks/issue1";
import { useAvailableMints } from "lib/hooks/issue1";
import { getDefaultToastConfig } from "utils/toast";

import type { NextPage } from "next";

import aloneImage from "../../../../public/assets/editions/Alone.jpg";
import alwaysImage from "../../../../public/assets/editions/Always.jpg";
import neverNextImage from "../../../../public/assets/editions/Never_Next.png";
import metamaskLogo from "../../../../public/assets/metamask-logo.png";
import { useAccount } from "wagmi";

export interface INftItemProps extends Nifty {}

const imageForEdition: Record<NiftyNames, StaticImageData> = {
  ALONE: aloneImage,
  ALWAYS: alwaysImage,
  "NEVER NEXT": neverNextImage,
};

const NftItem: NextPage<INftItemProps> = ({ name }) => {
  const distributionPrice = useStore(
    (state) => state.distributionMetaData.formatedData.price
  );
  const setDistributionMetaData = useStore(
    (state) => state.setDistributionMetaData
  );

  const { isConnected } = useAccount();
  const { availableMints } = useAvailableMints();
  // const { fetch, data } = useMint({ salePrice: distributionPrice });

  // useDistributionMetadata({
  //   onSuccess: (data) => setDistributionMetaData(data),
  //   enabled: !!data,
  //   deps: [data],
  // });

  const toast = useToast();
  const tooltipMessage =
    (!isConnected && "Connect Metamask to mint!") ||
    (!availableMints && "No available mints for this account!");

  async function onMintClick() {
    if (!isConnected)
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

    // await fetch({
    //   onSuccess: () => {
    //     toast(
    //       getDefaultToastConfig({
    //         title: "You have successfully minted the NFT",
    //         status: "success",
    //       })
    //     );
    //   },
    //   onError: (error) => {
    //     console.error(error);
    //     toast(
    //       getDefaultToastConfig({
    //         title: "There was an error with NFT minting",
    //         status: "error",
    //       })
    //     );
    //   },
    // });
  }

  return (
    <Box mb={20}>
      <Flex
        direction={["column", "row"]}
        justifyContent="space-between"
        mb={10}
      >
        <Box w={["full", "45%"]} minH={[300, 400]} pos="relative">
          <img src={imageForEdition[name].src} alt={`${name} nft`} />
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
              Congratulations <br />
              You have collected <br /> &quot;{name}&quot;
            </Heading>

            <Heading mt={[4]} size={["md", "lg"]}>
              NOW <br /> you can mint your <br /> NFT Metaborg Manga <br />{" "}
              Issue #01
            </Heading>
          </Box>

          <Tooltip
            label={tooltipMessage}
            isDisabled={isConnected && !!availableMints}
            placement="bottom"
            shouldWrapChildren
            hasArrow
            top={2}
          >
            <Button
              mt={[4]}
              size={["md", "lg"]}
              onClick={onMintClick}
              disabled={!isConnected || !availableMints}
            >
              MINT NOW
            </Button>
          </Tooltip>
        </Flex>
      </Flex>

      <Line />
    </Box>
  );
};

export { NftItem };
