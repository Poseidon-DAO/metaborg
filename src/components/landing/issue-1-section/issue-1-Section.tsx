import { Box, Heading, Text } from "@chakra-ui/react";

import { Image, ImageLinks } from "components/common";

import type { NextPage } from "next";

const Issue1Section: NextPage = () => {
  return (
    <Box
      as="section"
      pt="170px"
      pb={20}
      px={3}
      height="auto"
      position="relative"
      border="2px solid"
      borderColor="brand.white"
    >
      <Box position="absolute" top={0}>
        <Image
          src={ImageLinks.SectionBackround}
          alt=""
          width={400}
          height={400}
        />
      </Box>

      <Box position="relative">
        <Box position="absolute" top={0} zIndex={10} opacity={0.9}>
          <Image src={ImageLinks.Fighters} alt="" layout="fill" />
        </Box>

        <Box mb={5}>
          <Heading
            variant="lg"
            color="brand.red"
            fontWeight="semibold"
            textAlign="center"
          >
            Issue #1
          </Heading>
        </Box>

        <Box
          w={2 / 3}
          my={0}
          mx="auto"
          fontSize="22px"
          textAlign="center"
          px={48}
        >
          <Text>2024</Text>

          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            perspiciatis inventore distinctio quisquam dolorum numquam soluta
            culpa consequuntur, doloremque ab, tempora assumenda reprehenderit
            quis explicabo blanditiis minus.
          </Text>

          <br />

          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            perspiciatis inventore distinctio quisquam dolorum numquam soluta
            culpa consequuntur, doloremque ab, tempora assumenda reprehenderit
            quis explicabo blanditiis minus.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export { Issue1Section };
