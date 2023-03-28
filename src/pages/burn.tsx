import {
  Box,
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

const Burn: NextPage = () => {
  const { nfts } = useNfts();

  const showItemsNumber = nfts.length === 1 ? 1 : 2;

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
          Exchange NFTs for Physical Copies through Burning
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
