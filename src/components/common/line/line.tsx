import { Box, ThemeTypings } from "@chakra-ui/react";

import type { NextPage } from "next";

interface ILineProps {
  width?: string | number;
  height?: string | number;
  color?: ThemeTypings["colors"];
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
}

const Line: NextPage<ILineProps> = ({
  width = "100vw",
  height = "2px",
  color = "red",
  top = "unset",
  bottom = "unset",
  left = "0",
}) => {
  return (
    <Box
      w={width}
      height={height}
      pos="absolute"
      left={left}
      top={top}
      bottom={bottom}
      boxSizing="border-box"
      bg={`brand.${color}`}
    ></Box>
  );
};

export { Line };
