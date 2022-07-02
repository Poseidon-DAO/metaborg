/* eslint-disable @next/next/no-img-element */
import { Box, Flex, Text } from "@chakra-ui/react";

import { Line, PageContainer, SocialLinks } from "components/common";

import { type NextPage } from "next";

import signature from "../../../../public/assets/signature.png";

const Footer: NextPage = () => {
  return (
    <Box py={10} borderTop="2px solid" borderColor="brand.red">
      <PageContainer>
        <Box textAlign="center">
          <Box mb={20}>
            <Text color="brand.red" mb={2}>
              ART BY
            </Text>
            <Flex justify="center">
              <img src={signature.src} alt="signature" />
            </Flex>
          </Box>

          <Box mb={20}>
            <SocialLinks size="xl" />
          </Box>

          <Line width="70vw" height="1px" left="15vw" />

          <Box pt={8}>
            <Box
              mb={2}
              __css={{ ">:hover": { cursor: "pointer", color: "brand.red" } }}
            >
              <Text
                as="a"
                href="https://metaborg.io/privacy-policy/"
                target="_blank"
              >
                Privacy Policy
              </Text>{" "}
              –{" "}
              <Text
                as="a"
                href="https://metaborg.io/cookie-policy/"
                target="_blank"
              >
                Cookie Policy
              </Text>
            </Box>
            <Box color="brand.grayText">
              Copyright © 2022 Metaborg. All rights reserved by{" "}
              <Text as="a" href="https://giovannimotta.it/" target="_blank">
                Giovanni Motta.
              </Text>
            </Box>
          </Box>
        </Box>
      </PageContainer>
    </Box>
  );
};

export { Footer };
