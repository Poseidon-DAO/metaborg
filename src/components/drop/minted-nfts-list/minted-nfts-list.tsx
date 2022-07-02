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
import { NextPage } from "next";

import { tabs } from "./tabs";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

interface IMintedNFTsListProps {
  nfts: any[];
}

const MintedNFTsList: NextPage<IMintedNFTsListProps> = () => {
  return (
    <Flex flexDir="column">
      <Box mb={20}>
        <Line />
      </Box>

      <Tabs isFitted variant="enclosed" borderColor="brand.transparent">
        <TabList mb="1em">
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab.tabId}
                borderBottomColor="brand.red"
                flexDir="column"
                _selected={{
                  color: "brand.red",
                  borderColor: "brand.red",
                  borderBottom: "none",
                  fontWeight: "bold",
                }}
              >
                <Text>Original</Text>
                <Text fontSize="sm">You own: 3</Text>
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          {tabs.map((tab) => {
            return (
              <TabPanel key={tab.tabId}>
                <Container>
                  <Document file="https://pinata.elysiumbridge.org/ipfs/QmbJb8dRPptsEr65uCyMcPACZtKbyMo2n167KUddcMYGbS">
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
