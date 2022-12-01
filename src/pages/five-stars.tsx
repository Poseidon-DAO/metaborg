import { Box, Heading } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import {
  useAddressMetadata,
  useAvailablePages,
  usePublicVisibility,
  useUserGroup,
  useVisibilityForGroup,
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
const USER_GROUPS_FOR_CHECK = [1, 2, 3, 4, 5];

const FiveStars: NextPage = () => {
  const { isConnected } = useAccount();

  const { publicVisibility } = usePublicVisibility();
  const { userGroup, userGroupStatus } = useUserGroup({
    enabled: USER_GROUPS_FOR_CHECK.includes(Number(publicVisibility)),
  });
  const { isVisibile, visibilityStatus } = useVisibilityForGroup({
    userGroup,
    enabled: USER_GROUPS_FOR_CHECK.includes(Number(publicVisibility)),
  });

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
          <ConnectSection title="Welcome fighter collector, connect your wallet" />
        </Box>
      )}

      {isConnected && (
        <Box pt={[40, 60]} mb={[20, 40]}>
          <AccountInfo />
        </Box>
      )}

      <Box my={[8, 4]}>
        <Packages />
      </Box>

      {!!availablePages && (
        <Box my={[8, 14]} textAlign="center" color="red">
          <Heading>{136 - availablePages} / 136 claimed</Heading>
        </Box>
      )}

      <Box my={20}>
        <MintSection
          maxPages={availablePages}
          addressMetadata={addressMetadata}
          disableButtons={publicVisibility !== 0 && !isVisibile}
        />
      </Box>

      <Box my={16}>
        <Benefits />
      </Box>
    </>
  );
};

export default FiveStars;
