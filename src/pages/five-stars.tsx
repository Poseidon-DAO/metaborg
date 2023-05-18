import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useAccount } from "wagmi";
import {
  addHours,
  differenceInSeconds,
  intervalToDuration,
  format,
  formatDistanceToNowStrict,
  intlFormatDistance,
  formatDuration,
  parseISO,
  addDays,
} from "date-fns";

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
const IS_BURN_AVAILABLE = process.env.NEXT_PUBLIC_BURN_AVAILABLE === "true";
const BURN_START_DATE = process.env.NEXT_PUBLIC_BURN_START_DATE!;

const USER_GROUPS_FOR_CHECK = [1, 2, 3, 4];

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

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const startDate = parseISO(BURN_START_DATE!);
    const endDate = addDays(startDate, 1);

    const intervalId = setInterval(() => {
      const now = new Date();

      const duration = intervalToDuration({ start: now, end: endDate });

      setCountdown(
        formatDuration(duration, {
          format: ["hours", "minutes", "seconds"],
          delimiter: ":",
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const showSpinner =
    areAvailablePagesLoading ||
    areAddressMetadataLoading ||
    userGroupStatus === "loading" ||
    visibilityStatus === "loading";
  const hasError = availablePagesError || addressMetadataError;

  if (showSpinner) {
    return <FullPageLoader />;
  }

  if (hasError && isConnected) {
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
        <Flex
          pt={[40, 60]}
          mb={[20, 40]}
          justifyContent="flex-end"
          alignItems="center"
        >
          {!!IS_BURN_AVAILABLE && (
            <Box mr="8">
              <NextLink href="/burn" passHref>
                <Link color="brand.white" fontWeight="bold">
                  Burn
                </Link>
              </NextLink>
            </Box>
          )}

          <AccountInfo />
        </Flex>
      )}

      {!!IS_BURN_AVAILABLE && (
        <Box my={[8, 16]} textAlign="center">
          <Heading fontSize="3xl" mb={4}>
            Now you can burn you NFT to retrieve the fine art.
          </Heading>

          <NextLink href="/burn" passHref>
            <Heading
              fontSize="4xl"
              color="red"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Burning is now available 🔥
            </Heading>
          </NextLink>

          <Heading size="md" ml="8" mt="4">
            Burn ends in
          </Heading>

          <Heading size="lg">{countdown}</Heading>
        </Box>
      )}

      {!IS_BURN_AVAILABLE && (
        <Box my={[8, 4]}>
          <Packages />
        </Box>
      )}

      {publicVisibility === 5 && (
        <Box my={[8, 14]} textAlign="center" color="red">
          <Heading fontSize="xl">
            Minting is over, thanks for participating! <br /> <br /> In 6 months
            you will be able to burn your NFT and retrieve the physical copy of
            the page. <br /> Come back here in 6 months in order to burn the NFT
            and provide delivery details. <br /> Follow metaborg on{" "}
            <Link
              href="https://twitter.com/metaborg2024"
              isExternal
              textDecoration="underline"
            >
              twitter
            </Link>{" "}
            to receive all the updates and know when burn is unlocked
          </Heading>
        </Box>
      )}

      <Box my={[8, 14]} textAlign="center" color="red">
        <Heading>{136 - (availablePages || 0)} / 136 claimed</Heading>
      </Box>

      <Box my={20}>
        <MintSection
          maxPages={availablePages}
          addressMetadata={addressMetadata}
          disableButtons={
            publicVisibility === 5 || (publicVisibility !== 0 && !isVisibile)
          }
        />
      </Box>

      <Box my={16}>
        <Benefits />
      </Box>
    </>
  );
};

export default FiveStars;
