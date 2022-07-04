import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { useStore } from "store/store";
import { DropLayout } from "layout/drop";
import { Strips } from "components/common";
import { NftsList, Editions, MangaList } from "components/drop";
import { fetchMyNiftyProfile, key as profileKey } from "lib/api/nifty-me";
import { fetchNifties, key as niftiesKey } from "lib/api/nifty-nfts";
import { NiftiesApiResponse, NiftyUser } from "lib/api/types";
import { useDistributionMetadata } from "lib/hooks";
import { getNiftyRedirectUrl } from "utils/url-query-params";

import { type NextPage } from "next";
import { useNFTs } from "lib/hooks/use-nfts";
import { shapeNftsToNiftyApi } from "utils/nfts";

const Drop: NextPage = () => {
  const { asPath } = useRouter();
  const [, fragment] = asPath.split("#");
  const niftyContractAddress = process.env.NEXT_PUBLIC_NG_CONTRACT_ADDRESS;

  const setToken = useStore((state) => state.setToken);
  const setDistributionMetaData = useStore(
    (state) => state.setDistributionMetaData
  );

  const token = !!fragment
    ? new URLSearchParams(fragment).get("access_token")
    : "";

  const { isAuthenticated, enableWeb3, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    enableWeb3();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: userData } = useQuery<NiftyUser>(
    profileKey,
    () => fetchMyNiftyProfile({ token: token! }),
    {
      enabled: !!fragment && !!token,
      onSuccess: () => setToken(token!),
    }
  );

  const isLoggedInWithNifty = !!userData?.username;

  const { data: nifties } = useQuery<NiftiesApiResponse>(
    niftiesKey,
    () =>
      fetchNifties({
        token: token!,
        username: userData?.username!,
        contractAddress: niftyContractAddress!,
      }),
    {
      enabled: isLoggedInWithNifty,
    }
  );

  useDistributionMetadata({
    onSuccess: (data) => setDistributionMetaData(data),
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled],
  });

  // get nifty nfts
  const { data } = useNFTs({
    address: niftyContractAddress,
    enabled: isLoggedInWithNifty,
    deps: [isLoggedInWithNifty],
  });

  // get smart contract nfts
  const { data: metamaskNfts } = useNFTs({
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled],
  });

  console.log("vigan metamask nfts", metamaskNfts);

  async function onNiftyGatewayConnect() {
    const niftyGatewayUrl = getNiftyRedirectUrl();
    window.location.replace(niftyGatewayUrl.href);
  }

  const nftsToShow = [
    ...(nifties?.results || []),
    ...(shapeNftsToNiftyApi(data?.result) || []),
  ];

  return (
    <DropLayout>
      {!isLoggedInWithNifty && (
        <Container my={10} centerContent>
          <Box maxW="xl">
            <Heading textAlign="center" size={["xl", "2xl"]}>
              Welcome fighter collector, let us verify your enrollment
            </Heading>
          </Box>

          <Box my={[4, 8]}>
            <Strips />
            <Button onClick={onNiftyGatewayConnect} size={["lg", "xl"]}>
              Connect
            </Button>
          </Box>
        </Container>
      )}

      {isLoggedInWithNifty && !!nftsToShow.length && (
        <Box mb={20}>
          <NftsList nifties={nftsToShow} />
        </Box>
      )}

      {isAuthenticated && !!metamaskNfts?.result?.length && (
        <Box mt={40} mb={20}>
          <MangaList showTopLine={!nftsToShow.length} />
        </Box>
      )}

      <Box mt={[16, 40]}>
        <Editions />
      </Box>
    </DropLayout>
  );
};

export default Drop;
