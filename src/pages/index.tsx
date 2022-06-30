import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { Box, Container, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { DropLayout } from "layout/drop";
import { Strips } from "components/common";
import { ConnectWallet, NftsList, Editions } from "components/drop";

import { fetchMyNiftyProfile, key as profileKey } from "lib/api/nifty-me";
import { fetchNifties, key as niftiesKey } from "lib/api/nifty-nfts";
import { NiftiesApiResponse, NiftyUser } from "lib/api/types";

import { type NextPage } from "next";
import { useEffect } from "react";

const Drop: NextPage = () => {
  const { asPath } = useRouter();
  const [, fragment] = asPath.split("#");
  const token = !!fragment
    ? new URLSearchParams(fragment).get("access_token")
    : "";

  const { isAuthenticated, enableWeb3 } = useMoralis();

  const { data: userData } = useQuery<NiftyUser>(
    profileKey,
    () => fetchMyNiftyProfile({ token: token! }),
    {
      enabled: !!fragment && !!token,
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

  useEffect(() => {
    enableWeb3();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {userData?.username && !!nifties?.results.length && (
        <Box mt={10} mb={20}>
          <NftsList nifties={nifties.results} />
        </Box>
      )}

      <Box mt={[16, 40]}>
        <Editions />
      </Box>
    </DropLayout>
  );
};

export default Drop;
