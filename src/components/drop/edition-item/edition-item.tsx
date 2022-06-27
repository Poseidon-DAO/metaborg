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
import { Image } from "components/common";
import { NextPage } from "next";
import { EditionItem as IEditionItemProps } from "../editions/edition-utils";

const EditionItem: NextPage<IEditionItemProps> = ({
  no,
  name,
  editionType,
  format,
  benefits,
  cover,
}) => {
  return (
    <Box width="30%">
      <Box textAlign="center">
        <Heading size="xs">
          {no} - {editionType}
        </Heading>
        <Heading size="sm" mt={4}>
          &quot;{name}&quot;
        </Heading>
        <Text>{format === "image" ? "Still image" : "Video loop"}</Text>
      </Box>

      <Flex alignItems="center" minH={500}>
        <Box
          w="100%"
          pos="relative"
          border="2px solid"
          borderColor="brand.red"
          my={8}
        >
          <img src={cover} alt={`${name} edition image`} />
        </Box>
      </Flex>

      <Box fontWeight="bold">
        <Box my={4}>
          <Heading size="sm" my={2}>
            BENEFITS
          </Heading>

          <Text fontSize="xs">
            Fighter collectors who purchase an edition of &quot;{name}&quot;
            will receive:
          </Text>
        </Box>

        <OrderedList listStyleType="none" ml={0}>
          {Object.values(benefits || {}).map(({ main, subs }, index) => {
            return (
              <Box key={`${main}-${index}`}>
                <ListItem fontSize="xs">
                  {index + 1} - {main}
                </ListItem>

                <UnorderedList listStyleType="none">
                  {subs.map((sub) => (
                    <ListItem key={sub} fontSize="xs">
                      - {sub}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
            );
          })}
        </OrderedList>
      </Box>
    </Box>
  );
};

export { EditionItem };
