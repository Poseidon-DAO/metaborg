import { Box } from "@chakra-ui/react";
import { NextPage } from "next";

import { MintItem } from "../mint-item";

import data from "./section-data";

interface IMintSectionProps {
  maxPages?: number;
}

const MintSection: NextPage<IMintSectionProps> = ({ maxPages }) => {
  const filteredData = maxPages
    ? data.filter((item) => item.amount <= maxPages)
    : data;

  return (
    <Box py={4}>
      {filteredData.map((item) => (
        <MintItem key={item.id} item={item} disableButton={maxPages === 0} />
      ))}
    </Box>
  );
};

export { MintSection };
