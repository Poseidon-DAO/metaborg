import { Box, ThemeTypings } from "@chakra-ui/react";

import type { NextPage } from "next";

interface ILineProps {
  color?: ThemeTypings["colors"];
  top?: number;
  bottom?: number;
}

const Line: NextPage<ILineProps> = ({
  color = "red",
  top = "unset",
  bottom = "unset",
}) => {
  return (
    <Box
      w="100vw"
      height="2px"
      pos="absolute"
      left="0"
      top={top}
      bottom={bottom}
      boxSizing="border-box"
      bg={`brand.${color}`}
    ></Box>
  );
};

export { Line };
