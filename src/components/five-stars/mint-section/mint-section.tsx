import { useAccount } from "wagmi";
import { Box } from "@chakra-ui/react";
import { NextPage } from "next";

import { MintItem } from "components/five-stars";
import { IFormatedAddressMetadata } from "lib/hooks/five-stars";

import { makeSectionData } from "./section-data-utils";

interface IMintSectionProps {
  maxPages?: number;
  addressMetadata?: IFormatedAddressMetadata;
  disableButtons?: boolean;
}

const tooltipMessages = {
  auth: "Please connect Metamask to mint!",
  sufficentPages: "No more pages available!",
  general: "Minting is closed!",
};

const MintSection: NextPage<IMintSectionProps> = ({
  maxPages,
  addressMetadata,
  disableButtons,
}) => {
  const { isConnected } = useAccount();
  const data = makeSectionData(addressMetadata);

  const filteredData = maxPages
    ? data.filter((item) => item.amount <= maxPages)
    : data;

  const labelKey = !isConnected
    ? "auth"
    : maxPages === 0
    ? "sufficentPages"
    : "general";

  return (
    <Box py={[0, 4]}>
      {filteredData.map((item) => (
        <MintItem
          key={item.id}
          item={item}
          disableButton={disableButtons || maxPages === 0}
          label={tooltipMessages[labelKey]}
        />
      ))}
    </Box>
  );
};

export { MintSection };
