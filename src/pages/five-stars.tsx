import { Box, Heading } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import {
  useAddressMetadata,
  useAvailablePages,
  useUserGroup,
  useVisibility,
} from "lib/hooks/five-stars";
import {
  ConnectSection,
  AccountInfo,
  FullPageLoader,
  ErrorPage,
} from "components/common";
import { Benefits, MintSection, Packages } from "components/five-stars";

import { type NextPage } from "next";

const IS_APP_ENABLED = process.env.NEXT_PUBLIC_APP_AVAILABLE === "true";
const APP_DISABLED_MESSAGE = process.env.NEXT_PUBLIC_APP_NOT_AVAILABLE_MESSAGE;

const FiveStars: NextPage = () => {
  const { isConnected } = useAccount();

  const { userGroup, userGroupStatus } = useUserGroup();
  const { isVisibile, visibilityStatus } = useVisibility({ userGroup });
  const { availablePages, areAvailablePagesLoading, availablePagesError } =
    useAvailablePages();
  const { addressMetadata, areAddressMetadataLoading, addressMetadataError } =
    useAddressMetadata();

  const showSpinner =
    areAvailablePagesLoading ||
    areAddressMetadataLoading ||
    userGroupStatus === "loading" ||
    visibilityStatus === "loading";
  const hasError = availablePagesError || addressMetadataError;

  if (showSpinner) {
    return <FullPageLoader />;
  }

  if (hasError) {
    return <ErrorPage />;
  }

  if (!IS_APP_ENABLED) {
    return (
      <Box pt={[14, 64]} textAlign="center">
        <Heading mt={60} size={["lg", "2xl"]}>
          {APP_DISABLED_MESSAGE || "The MINT haven't started yet!"}
        </Heading>
      </Box>
    );
  }

  return (
    <>
      {!isConnected && (
        <Box pt={[40, 80]}>
          <ConnectSection title="Welcome fighter collector, collect your wallet" />
        </Box>
      )}

      {isConnected && (
        <Box pt={[40, 60]} mb={[20, 40]}>
          <AccountInfo />
        </Box>
      )}

      {!isVisibile && isConnected && (
        <Box my={[8, 14]} textAlign="center" color="red">
          <Heading>You are not eligble for mint!</Heading>
        </Box>
      )}

      <Box my={[8, 4]}>
        <Packages />
      </Box>

      {!(!isVisibile && isConnected) && availablePages && (
        <Box my={[8, 14]} textAlign="center" color="red">
          <Heading>{136 - availablePages} / 136 claimed</Heading>
        </Box>
      )}

      <Box my={20}>
        <MintSection
          maxPages={availablePages}
          addressMetadata={addressMetadata}
          disableButtons={!isVisibile}
        />
      </Box>

      <Box my={16}>
        <Benefits />
      </Box>
    </>
  );
};

export default FiveStars;
