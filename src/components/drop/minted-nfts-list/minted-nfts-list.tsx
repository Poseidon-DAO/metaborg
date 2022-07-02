import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Document, Page, pdfjs } from "react-pdf";

import { Line } from "components/common";
import { useStore } from "store/store";

import type { NextPage } from "next";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface IMintedNFTsListProps {
  nfts: any[];
  showTopLine?: boolean;
}

const MintedNFTsList: NextPage<IMintedNFTsListProps> = ({ showTopLine }) => {
  const distributionMetaData = useStore((state) => state.distributionMetaData);

  const { diamondSupply, goldSupply, originlSupply } =
    distributionMetaData.formatedData;

  const tabs = [
    {
      tabId: 1,
      name: "Diamond",
      supply: diamondSupply,
      pdfFile:
        "https://pinata.elysiumbridge.org/ipfs/QmbJb8dRPptsEr65uCyMcPACZtKbyMo2n167KUddcMYGbS",
    },
    {
      tabId: 2,
      name: "Gold",
      supply: goldSupply,
      pdfFile:
        "https://pinata.elysiumbridge.org/ipfs/QmbJb8dRPptsEr65uCyMcPACZtKbyMo2n167KUddcMYGbS",
    },
    {
      tabId: 3,
      name: "Original",
      supply: originlSupply,
      pdfFile:
        "https://pinata.elysiumbridge.org/ipfs/QmbJb8dRPptsEr65uCyMcPACZtKbyMo2n167KUddcMYGbS",
    },
  ];

  return (
    <Flex flexDir="column">
      {showTopLine && (
        <Box mb={20}>
          <Line />
        </Box>
      )}

      <Tabs isFitted variant="enclosed" borderColor="brand.transparent">
        <TabList mb="1em">
          {tabs.map((tab) => {
            const { tabId, name, supply } = tab;

            return (
              <Tab
                key={tabId}
                borderBottomColor="brand.red"
                flexDir="column"
                _selected={{
                  color: "brand.red",
                  borderColor: "brand.red",
                  borderBottom: "none",
                  fontWeight: "bold",
                }}
              >
                <Text>{name}</Text>
                <Text fontSize="sm">You own: {supply}</Text>
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          {tabs.map((tab) => {
            const { tabId, pdfFile } = tab;

            return (
              <TabPanel key={tabId}>
                <Container>
                  <Document file={pdfFile}>
                    <Page pageNumber={1} />
                  </Document>
                </Container>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>

      <Box mt={20}>
        <Line />
      </Box>
    </Flex>
  );
};

export { MintedNFTsList };
