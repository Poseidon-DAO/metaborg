import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Box, Container, Heading, Spinner, useToast } from "@chakra-ui/react";

import { DropLayout } from "layout/drop";
import { Strips } from "components/common";
import {
  Editions,
  MangaList,
  ConnectWallet,
  MintSection,
} from "components/drop";
import {
  getFormatedData,
  useAvailableMints,
  useContractNFTs,
  useDistributionMetadata,
  useTokenTransferEvent,
} from "lib/hooks";

import { type NextPage } from "next";
import { useDistributionIndex } from "lib/hooks/use-distribution-index";
import { getDefaultToastConfig } from "utils/toast";
import { useContractCall } from "lib/hooks/use-contract-call";

const metaborgContractAddress =
  process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS;
const appIsEnabled = process.env.NEXT_PUBLIC_APP_AVAILABLE;
const appEnabledMessage = process.env.NEXT_PUBLIC_APP_AVAILABLE_MESSAGE;

const Drop: NextPage = () => {
  const toast = useToast();
  const toastId = new Date().toString() + Math.random();
  const { isAuthenticated, enableWeb3, isWeb3Enabled, user, Moralis, logout } =
    useMoralis();

  useEffect(() => {
    enableWeb3();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribeAccountChangeHandler = Moralis.onAccountChanged(() => {
      logout();
    });

    return () => {
      unsubscribeAccountChangeHandler();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribeChainChangeHandler = Moralis.onChainChanged((chain) => {
      if (
        chain === Moralis.Chains.ETH_MAINET ||
        chain === Moralis.Chains.ETH_RINKBEY
      )
        return;

      if (toast.isActive(toastId)) return;

      toast({
        id: toastId,
        position: "top-right",
        status: "warning",
        title: "Please connect to mainnet!",
      });
    });

    return () => {
      unsubscribeChainChangeHandler();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { index } = useDistributionIndex({
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled],
  });

  const [distIndex, setDistIndex] = useState(index);

  useEffect(() => {
    setDistIndex(index);
  }, [index]);

  const {
    allAvailableMints,
    isFetching: isFetchingAvbMints,
    isLoading: isLoadingAvbMints,
    mintsObj,
  } = useAvailableMints({
    promiseAll: true,
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled, distIndex],
    _mangaDistributionID: distIndex,
  });

  useEffect(() => {
    const nonIndexDistId = Object.keys(mintsObj).find(
      (distId) => mintsObj[distId] > 0
    );
    setDistIndex(nonIndexDistId || "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAvailableMints]);

  const [myAvailableMints, setMyAvailableMints] = useState(allAvailableMints);

  const { data: distributionMetadata, fetch: fetchDistributionMetadata } =
    useDistributionMetadata({
      mangaDistributionID: distIndex,
      enabled: isAuthenticated && isWeb3Enabled && !!distIndex,
      deps: [isAuthenticated, isWeb3Enabled, distIndex, myAvailableMints],
    });

  useEffect(() => {
    setMyAvailableMints(allAvailableMints);
  }, [allAvailableMints]);

  const {
    fetch: fetchTokenTransferEvent,
    isFetching,
    isLoading,
  } = useTokenTransferEvent({
    address: metaborgContractAddress!,
    eventName: "TransferSingle",
  });

  const { filteredResult } = useContractNFTs({
    contractAddress: metaborgContractAddress!,
    address: user?.get("ethAddress"),
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled && myAvailableMints],
  });

  const [disableMintButton, setDisableMintButton] = useState(false);

  let timerId: ReturnType<typeof setTimeout>;
  async function onMintSuccess(mintData: any) {
    fetchTokenTransferEvent({
      onSuccess: () => {
        setMyAvailableMints((prevState) => Number(prevState) - 1);

        setDisableMintButton(true);
        timerId = setTimeout(() => {
          fetchDistributionMetadata({
            onSuccess: () => {
              clearTimeout(timerId);
              setDisableMintButton(false);
              toast(
                getDefaultToastConfig({
                  title: "You have successfully minted the NFT",
                  status: "success",
                })
              );
            },
            params: {
              params: {
                _mangaDistributionID: distIndex,
              },
            },
          });
        }, 15000);
      },
      onError: (err) => console.log("error", err),
    });
  }

  const showPdfReader = !!(filteredResult || []).filter((nft) =>
    ["1", "2", "3"].includes(nft.token_id)
  ).length;

  const sectionsLoading = isFetchingAvbMints || isLoadingAvbMints;

  return (
    <DropLayout>
      {appEnabledMessage != "" && (
        <Box my={20}>
          <Heading fontSize="6xl" textAlign="center">
            {appEnabledMessage}
          </Heading>
        </Box>
      )}

      {!isAuthenticated && (
        <Container my={10} centerContent>
          <Box maxW="xl">
            <Heading textAlign="center" size={["xl", "2xl"]}>
              Welcome fighter collector, let us verify your enrollment
            </Heading>
          </Box>

          <Box my={[4, 8]}>
            <Strips />
            <ConnectWallet />
          </Box>
        </Container>
      )}

      {!isAuthenticated && (
        <Heading textAlign="center" size={["md", "lg"]}>
          Don&apos;t forget to move your &quot;Never Next&quot;,
          &quot;Always&quot; or &quot;Alone&quot; NFTs to your MetaMask wallet
          in order to be verified for the Manga NFT minting.
        </Heading>
      )}

      {sectionsLoading && (
        <Box my={8} mb={40} textAlign="center">
          <Spinner color="brand.red" />
        </Box>
      )}

      {isAuthenticated && myAvailableMints == 0 && (
        <Box my={8} mb={40}>
          <Heading textAlign="center">
            You are not eligible for MINTING!
          </Heading>

          <Heading textAlign="center" size={["md", "lg"]}>
            Don&apos;t forget to move your &quot;Never Next&quot;,
            &quot;Always&quot; or &quot;Alone&quot; NFTs to your MetaMask wallet
            in order to be verified for the Manga NFT minting.
          </Heading>
        </Box>
      )}

      {isAuthenticated && !!myAvailableMints && (
        <MintSection
          availableMints={myAvailableMints}
          distributionMetadata={distributionMetadata}
          onMintSuccess={onMintSuccess}
          isLoading={isFetching || isLoading}
          distIndex={distIndex as string}
          disabled={disableMintButton}
        />
      )}

      {isAuthenticated && showPdfReader && (
        <Box mt={0} mb={20}>
          <MangaList distributionMetadata={distributionMetadata} />
        </Box>
      )}

      <Box mt={[16, 40]}>
        <Editions />
      </Box>
    </DropLayout>
  );
};

export default Drop;
