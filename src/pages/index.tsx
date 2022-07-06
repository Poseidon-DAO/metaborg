import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { Box, Container, Heading, useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { useStore } from "store/store";
import { DropLayout } from "layout/drop";
import { Strips } from "components/common";
import {
  /*NftsList,*/
  Editions,
  MangaList,
  ConnectWallet,
  MintSection,
} from "components/drop";
import { fetchMyNiftyProfile, key as profileKey } from "lib/api/nifty-me";
import { fetchNifties, key as niftiesKey } from "lib/api/nifty-nfts";
import { NiftiesApiResponse, NiftyUser } from "lib/api/types";
import {
  useAvailableMints,
  useContractNFTs,
  useDistributionMetadata,
} from "lib/hooks";
import { shapeNftsToNiftyApi } from "utils/nfts";

import { type NextPage } from "next";

const niftyContractAddress = process.env.NEXT_PUBLIC_NG_CONTRACT_ADDRESS;
const metaborgContractAddress =
  process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS;
const appIsEnabled = process.env.NEXT_PUBLIC_APP_AVAILABLE;

const Drop: NextPage = () => {
  const { asPath } = useRouter();
  const [, fragment] = asPath.split("#");

  const setToken = useStore((state) => state.setToken);
  const setDistributionMetaData = useStore(
    (state) => state.setDistributionMetaData
  );

  const token = !!fragment
    ? new URLSearchParams(fragment).get("access_token")
    : "";
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

  // const { data: userData } = useQuery<NiftyUser>(
  //   profileKey,
  //   () => fetchMyNiftyProfile({ token: token! }),
  //   {
  //     enabled: !!fragment && !!token && false,
  //     onSuccess: () => setToken(token!),
  //   }
  // );

  // const isLoggedInWithNifty = !!userData?.username;

  // const { data: apiNifties } = useQuery<NiftiesApiResponse>(
  //   niftiesKey,
  //   () =>
  //     fetchNifties({
  //       token: token!,
  //       username: userData?.username!,
  //       contractAddress: niftyContractAddress!,
  //     }),
  //   {
  //     enabled: isLoggedInWithNifty && false,
  //   }
  // );

  useDistributionMetadata({
    onSuccess: (data) => setDistributionMetaData(data),
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled],
  });

  const { availableMints } = useAvailableMints({
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled],
  });

  // const { data: niftySmartContractNFTs } = useContractNFTs({
  //   contractAddress: niftyContractAddress!,
  //   enabled: isLoggedInWithNifty && false,
  //   deps: [isLoggedInWithNifty],
  // });

  const { data: metaborgSmartContractNFTs } = useContractNFTs({
    contractAddress: metaborgContractAddress!,
    address: user?.get("ethAddress"),
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled],
  });

  // const nifties = [
  //   ...(apiNifties?.results || []),
  //   ...(shapeNftsToNiftyApi(niftySmartContractNFTs?.result) || []),
  // ];
  const showPdfReader = !!(metaborgSmartContractNFTs?.result || []).filter(
    (nft) => ["1", "2", "3"].includes(nft.token_id)
  ).length;

  // const showNiftiesSection = isLoggedInWithNifty && !!nifties.length;

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

      {/* {showNiftiesSection && (
        <Box mb={20}>
          <NftsList nifties={nifties} />
        </Box>
      )} */}

      {/* {!nifties.length && !availableMints && isAuthenticated && (
        <Heading textAlign="center">You are not eligible to MINT!</Heading>
      )} */}

      {isAuthenticated && !availableMints && (
        <Box my={8} mb={40}>
          <Heading textAlign="center">You are not eligible for MINT!</Heading>
        </Box>
      )}

      {isAuthenticated && !!availableMints && (
        <MintSection availableMints={availableMints} />
      )}

      {isAuthenticated && showPdfReader && (
        <Box mt={0} mb={20}>
          <MangaList />
        </Box>
      )}

      <Box mt={[16, 40]}>
        <Editions />
      </Box>
    </DropLayout>
  );
};

export default Drop;
