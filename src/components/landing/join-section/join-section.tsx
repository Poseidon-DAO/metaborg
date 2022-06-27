import NextLink from "next/link";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { Image, ImageLinks } from "components/common";

import { type NextPage } from "next";

const JoinSection: NextPage = () => {
  return (
    <Box as="section" w="100%" px={3} pt={16} pb={20}>
      <Flex mx={60} flexDir="column" alignItems="center">
        <Text className="uppercase text-red" variant="p">
          Art by
        </Text>

        <Image
          src={ImageLinks.Signature}
          alt="Signature"
          width={200}
          height={60}
        />
        <Box height={30} />

        <NextLink href="https://join.metaborg.io/" passHref>
          <Button as="a" target="_blank">
            Join Metaborg
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
};

export { JoinSection };
