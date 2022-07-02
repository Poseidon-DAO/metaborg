import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { Box, Container, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { useStore } from "store/store";
import { DropLayout } from "layout/drop";
import { Strips } from "components/common";
import {
  ConnectWallet,
  NftsList,
  Editions,
  MintedNFTsList,
} from "components/drop";
import { fetchMyNiftyProfile, key as profileKey } from "lib/api/nifty-me";
import { fetchNifties, key as niftiesKey } from "lib/api/nifty-nfts";
import { NiftiesApiResponse, NiftyUser } from "lib/api/types";
import { useDistributionMetadata } from "lib/hooks";

import { type NextPage } from "next";

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
  const { data: nifties } = useQuery<NiftiesApiResponse>(
    niftiesKey,
    () =>
      fetchNifties({
        token: token!,
        username: userData?.username!,
        contractAddress: "123123",
      }),
    {
      enabled: !!userData?.username,
    }
  );

  useDistributionMetadata({
    onSuccess: (data) => setDistributionMetaData(data),
    enabled: isAuthenticated && isWeb3Enabled,
    deps: [isAuthenticated, isWeb3Enabled],
  });

  const showAuthButton = !isAuthenticated || !userData?.username;

  return (
    <DropLayout>
      {showAuthButton && (
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

      {userData?.username && !!nifties?.results && (
        <Box mt={40} mb={20}>
          <NftsList nifties={nifties.results} />
        </Box>
      )}

      {isAuthenticated && (
        <Box mt={40} mb={20}>
          <MintedNFTsList
            nfts={[{ id: 1 }]}
            showTopLine={!nifties?.results.length}
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
