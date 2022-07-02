import { Flex } from "@chakra-ui/react";

import { EditionItem } from "components/drop/edition-item";

import type { NextPage } from "next";

import { EDITIONS_DATA } from "./data";

const Editions: NextPage = () => {
  return (
    <Flex direction={["column", "row"]} justifyContent="space-between">
      {EDITIONS_DATA.map((edition) => {
        return <EditionItem key={edition.name} {...edition} />;
      })}
    </Flex>
  );
};

export { Editions };
