import { Box } from "@chakra-ui/react";
import { NextPage } from "next";

import { MintItem } from "components/five-stars";
import { IFormatedAddressMetadata } from "lib/hooks/five-stars";

import { makeSectionData } from "./section-data-utils";

interface IMintSectionProps {
  maxPages?: number;
  addressMetadata?: IFormatedAddressMetadata;
}

const MintSection: NextPage<IMintSectionProps> = ({
  maxPages,
  addressMetadata,
}) => {
  const data = makeSectionData(addressMetadata);

  const filteredData = maxPages
    ? data.filter((item) => item.amount <= maxPages)
    : data;

  return (
    <Box py={[0, 4]}>
      {filteredData.map((item) => (
        <MintItem key={item.id} item={item} disableButton={maxPages === 0} />
      ))}
    </Box>
  );
};

export { MintSection };
