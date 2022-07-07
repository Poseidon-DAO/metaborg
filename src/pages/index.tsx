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
  useAvailableMints,
  useContractNFTs,
  useDistributionMetadata,
  useTokenTransferEvent,
} from "lib/hooks";

import { type NextPage } from "next";
import { useDistributionIndex } from "lib/hooks/use-distribution-index";
import { getDefaultToastConfig } from "utils/toast";

const metaborgContractAddress =
  process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS;
const appIsEnabled = process.env.NEXT_PUBLIC_APP_AVAILABLE;

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

  const { data: distributionMetadata } = useDistributionMetadata({
    mangaDistributionID: index,
    enabled: isAuthenticated && isWeb3Enabled && !!index,
    deps: [isAuthenticated, isWeb3Enabled, index],
  });

  const {
    availableMints,
    allAvailableMints,
    isFetching: isFetchingAvbMints,
    isLoading: isLoadingAvbMints,
  } = useAvailableMints({
    promiseAll: true,
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled, index],
    _mangaDistributionID: index,
  });

  const [myAvailableMints, setMyAvailableMints] = useState(allAvailableMints);

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

  const {
    data: metaborgSmartContractNFTs,
    isFetching: isFetchingNFTs,
    isLoading: isLoadingNFTs,
  } = useContractNFTs({
    contractAddress: metaborgContractAddress!,
    address: user?.get("ethAddress"),
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled],
  });

  async function onMintSuccess() {
    fetchTokenTransferEvent({
      onSuccess: () => {
        setMyAvailableMints((prevState) => Number(prevState) - 1);
        toast(
          getDefaultToastConfig({
            title: "You have successfully minted the NFT",
            status: "success",
          })
        );
      },
      onError: (err) => console.log("error", err),
    });
  }

  const showPdfReader = !!(metaborgSmartContractNFTs?.result || []).filter(
    (nft) => ["1", "2", "3"].includes(nft.token_id)
  ).length;
  const sectionsLoading = isFetchingAvbMints || isLoadingAvbMints;

  if (appIsEnabled === "false") {
    return (
      <DropLayout>
        <Box my={20}>
          <Heading fontSize="6xl" textAlign="center">
            The minting has not started yet!
          </Heading>
        </Box>
        <Box mt={[16, 40]}>
          <Editions />
        </Box>
      </DropLayout>
    );
  }

  return (
    <DropLayout>
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

      {sectionsLoading && (
        <Box my={8} mb={40} textAlign="center">
          <Spinner color="brand.red" />
        </Box>
      )}

      {isAuthenticated && myAvailableMints === 0 && (
        <Box my={8} mb={40}>
          <Heading textAlign="center">You are not eligible for MINT!</Heading>
        </Box>
      )}

      {isAuthenticated && !!myAvailableMints && (
        <MintSection
          availableMints={myAvailableMints}
          distributionMetadata={distributionMetadata}
          onMintSuccess={onMintSuccess}
          isLoading={isFetching || isLoading}
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
