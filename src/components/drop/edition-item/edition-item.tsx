/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import { EditionItem as IEditionItemProps } from "components/drop/editions/edition-utils";

import type { NextPage } from "next";

const EditionItem: NextPage<IEditionItemProps> = ({
  editionNr,
  name,
  editionType,
  format,
  benefits,
  cover,
}) => {
  return (
    <Box width={["100%", "30%"]} my={4}>
      <Box textAlign={["left", "center"]} mb={[4]}>
        <Heading size="xs">
          {editionNr} - {editionType}
        </Heading>
        <Heading size="sm" mt={4}>
          &quot;{name}&quot;
        </Heading>
        <Text>{format === "image" ? "Still image" : "Video loop"}</Text>
      </Box>

      <Flex alignItems="center" minH={[300, 500]}>
        <Box
          w="100%"
          pos="relative"
          border="2px solid"
          borderColor="brand.red"
          my={[0, 8]}
        >
          <img src={cover} alt={`${name} edition image`} />
        </Box>
      </Flex>

      <Box fontWeight="bold">
        <Box my={[2, 4]}>
          <Heading size="sm" my={2}>
            BENEFITS
          </Heading>

          <Text fontSize="xs">
            Fighter collectors who purchase an edition of &quot;{name}&quot;
            will receive:
          </Text>
        </Box>

        <OrderedList>
          {Object.values(benefits || {}).map(({ main, subs }, index) => {
            return (
              <Box key={`${main}-${index}`}>
                <ListItem fontSize="xs">{main}</ListItem>

                <UnorderedList
                  listStyleType="none"
                  css={{
                    ">li:before": {
                      content: '"-"',
                      position: "absolute",
                      marginLeft: -10,
                    },
                  }}
                >
                  {subs.map((sub) => (
                    <ListItem key={sub} fontSize="xs">
                      {sub}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
            );
          })}
        </OrderedList>
      </Box>

      <Box
        display={["block", "none"]}
        w="full"
        h="2px"
        bg="brand.red"
        mt={4}
      ></Box>
    </Box>
  );
};

export { EditionItem };
