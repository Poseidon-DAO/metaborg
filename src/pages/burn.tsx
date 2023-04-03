import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { type NextPage } from "next";
import NextLink from "next/link";
import { useNfts } from "lib/hooks/common";
import { BurnItem } from "components/five-stars/burn-item";
import { useRouter } from "next/router";

const IS_BURN_AVAILABLE = process.env.NEXT_PUBLIC_BURN_AVAILABLE === "true";

const Burn: NextPage = () => {
  const { replace } = useRouter();
  const { nfts, status } = useNfts();

  const showItemsNumber = nfts.length === 1 ? 1 : 2;

  if (!IS_BURN_AVAILABLE) {
    replace("/five-stars");
    return null;
  }

  if (status === "loading") {
    return (
      <Flex justifyContent="center" alignItems="center" h="90vh" pt={[40, 60]}>
        <CircularProgress isIndeterminate color="brand.red" />
      </Flex>
    );
  }

  return (
    <Box pt={[40, 60]}>
      <Flex alignItems="center" ml="-8">
        <Tooltip label="Back">
          <span>
            <NextLink href="/five-stars" passHref>
              <IconButton
                aria-label="back"
                variant="solid"
                bg="border"
                w="12"
                h="12"
                icon={<ArrowBackIcon boxSize={6} />}
              />
            </NextLink>
          </span>
        </Tooltip>

        <Heading size="lg" ml="8">
          Burn your NFT to receive the fine art printed page
        </Heading>
      </Flex>

      {!nfts.length ? (
        <Flex
          my="16"
          mb="20"
          h="30vh"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          <Heading size="md" color="crimson">
            You don&apos;t own any Five Stars edition Nfts!
          </Heading>
          <NextLink href="/five-stars" passHref>
            <Link size="md" mt="4">
              Go Back
            </Link>
          </NextLink>
        </Flex>
      ) : (
        <Box my="16" mb="20">
          <Grid
            gap={10}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              `repeat(${showItemsNumber}, 1fr)`,
            ]}
            justifyItems="center"
          >
            {nfts.map((nft, i) => (
              <GridItem key={i} overflow="hidden" maxW="400px">
                <BurnItem {...nft} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Burn;
