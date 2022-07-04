import { useState } from "react";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Document, Page, pdfjs } from "react-pdf";

import { Line } from "components/common";
import { useStore } from "store/store";

import type { NextPage } from "next";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

interface IMintedNFTsListProps {
  showTopLine?: boolean;
}

const MangaList: NextPage<IMintedNFTsListProps> = ({ showTopLine }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const distributionMetaData = useStore((state) => state.distributionMetaData);

  const { diamondSupply, goldSupply, originlSupply } =
    distributionMetaData.formatedData;

  const tabs = [
    {
      tabId: 1,
      name: "Diamond",
      supply: diamondSupply,
      pdfFile: process.env.NEXT_PUBLIC_DIAMOND_PDF,
    },
    {
      tabId: 2,
      name: "Gold",
      supply: goldSupply,
      pdfFile: process.env.NEXT_PUBLIC_GOLD_PDF,
    },
    {
      tabId: 3,
      name: "Original",
      supply: originlSupply,
      pdfFile: process.env.NEXT_PUBLIC_ORIGINAL_PDF,
    },
  ];

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const currentTabIndex = tabs.findIndex((tab) => tab.supply > 0);

  return (
    <Flex flexDir="column">
      {showTopLine && (
        <Box mb={20}>
          <Line />
        </Box>
      )}

      <Tabs
        index={currentTabIndex}
        isFitted
        variant="enclosed"
        borderColor="brand.transparent"
      >
        <TabList mb="1em">
          {tabs.map((tab) => {
            const { tabId, name, supply } = tab;

            return (
              <Tab
                isDisabled={!supply}
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
                <Flex justifyContent="space-between" alignItems="center">
                  <IconButton
                    variant="ghost"
                    aria-label="Search database"
                    icon={<ChevronLeftIcon w={14} h={14} />}
                    onClick={() => setPageNumber((prevPage) => prevPage - 1)}
                  />
                  <Box height={900} margin="1em 0">
                    <Document
                      options={options}
                      file={pdfFile}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                  </Box>
                  <IconButton
                    variant="ghost"
                    aria-label="Search database"
                    icon={<ChevronRightIcon w={14} h={14} />}
                    onClick={() => setPageNumber((prevPage) => prevPage + 1)}
                  />
                </Flex>

                <Heading size="md" textAlign="center">
                  {pageNumber} / {numPages}
                </Heading>
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

export { MangaList };
