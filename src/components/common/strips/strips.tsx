import { Box, Flex } from "@chakra-ui/react";

import type { NextPage } from "next";

type Position = "top" | "bottom";

interface IStripsProps {
  position?: Position;
}

const bordersForPosition: Record<Position, { left: string; right: string }> = {
  top: {
    left: "2px 1px 0 0",
    right: "2px 0 0 1px",
  },
  bottom: {
    left: "0 1px 2px 0",
    right: "0 0 2px 1px",
  },
};

const Strips: NextPage<IStripsProps> = ({ position = "top" }) => {
  return (
    <Flex w="85%" margin="0 auto">
      <Box
        borderWidth={bordersForPosition[position].left}
        borderStyle="dashed"
        borderColor="brand.red"
        h="20"
        w="50%"
      />

      <Box
        borderWidth={bordersForPosition[position].right}
        borderStyle="dashed"
        borderColor="brand.red"
        h="20"
        w="50%"
      />
    </Flex>
  );
};

export { Strips };
