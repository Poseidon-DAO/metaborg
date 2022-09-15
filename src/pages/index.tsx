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
    deps: [isAuthenticated, isWeb3Enabled, index],
    _mangaDistributionID: index,
  });

  useEffect(() => {
    const nonIndexDistId = Object.keys(mintsObj).find(
      (distId) => mintsObj[distId] > 0
    );
    setDistIndex(nonIndexDistId || "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAvailableMints]);

  const indexOrNonZeroIndex = mintsObj[index] > 0 ? index : distIndex;

  const [myAvailableMints, setMyAvailableMints] = useState(allAvailableMints);

  const { data: distributionMetadata } = useDistributionMetadata({
    mangaDistributionID: indexOrNonZeroIndex,
    enabled: isAuthenticated && isWeb3Enabled && !!indexOrNonZeroIndex,
    deps: [
      isAuthenticated,
      isWeb3Enabled,
      indexOrNonZeroIndex,
      myAvailableMints,
    ],
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

  const { filteredResult, fetch: fetchNFTs } = useContractNFTs({
    contractAddress: metaborgContractAddress!,
    address: user?.get("ethAddress"),
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled && myAvailableMints],
  });

  const [disableMintButton, setDisableMintButton] = useState<boolean | null>(
    null
  );
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    let max = 5;
    let count = 0;

    if (refetchData && count < max) {
      let intervalId: ReturnType<typeof setInterval>;

      timerId = setTimeout(() => {
        intervalId = setInterval(() => {
          console.log("Fetching...");
          fetchNFTs();

          if (count === max) {
            clearInterval(intervalId);
            clearTimeout(timerId);
          }
          count++;
        }, 30000);
      }, 30000);
    }

    return () => clearTimeout(timerId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchData]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (refetchData) {
      timerId = setTimeout(() => {
        setRefetchData(false);
      }, 6 * 30000);
    }

    return () => clearTimeout(timerId);
  }, [refetchData]);

  async function onMintSuccess() {
    let timerId: ReturnType<typeof setTimeout>;
    fetchTokenTransferEvent({
      onComplete: () => {
        timerId = setTimeout(() => {
          setDisableMintButton(false);
        }, 10000);
      },
      onSuccess: () => {
        setMyAvailableMints((prevState) => Number(prevState) - 1);
        setDisableMintButton(true);
        setRefetchData(true);

        clearTimeout(timerId);
      },
      onError: (err) => console.log("error", err),
    });
  }

  const showPdfReader = !!(filteredResult || []).filter((nft) =>
    ["1", "2", "3"].includes(nft.token_id)
  ).length;
  const diamondSupply = Number(
    filteredResult?.find((manga) => manga.token_id === "1")?.amount
  );
  const goldSupply = Number(
    filteredResult?.find((manga) => manga.token_id === "2")?.amount
  );
  const originalSupply = Number(
    filteredResult?.find((manga) => manga.token_id === "3")?.amount
  );

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
          distIndex={indexOrNonZeroIndex as string}
          disabled={!!disableMintButton}
        />
      )}

      {isAuthenticated && showPdfReader && (
        <Box mt={0} mb={20}>
          <MangaList
            diamondSupply={diamondSupply}
            goldSupply={goldSupply}
            originalSupply={originalSupply}
          />
        </Box>
      )}

      <Box mt={[16, 40]}>
        <Editions />
      </Box>
    </DropLayout>
  );
};

export default Drop;
