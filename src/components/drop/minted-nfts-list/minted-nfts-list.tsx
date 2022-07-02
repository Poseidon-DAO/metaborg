import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Line } from "components/common";
import { NextPage } from "next";

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
          <Tab
            _selected={{
              color: "brand.red",
              borderColor: "brand.red",
              borderBottom: "none",
            }}
            borderBottomColor="brand.red"
          >
            Original
          </Tab>
          <Tab
            _selected={{
              color: "brand.red",
              borderColor: "brand.red",
              borderBottom: "none",
            }}
            borderBottomColor="brand.red"
          >
            Gold
          </Tab>
          <Tab
            _selected={{
              color: "brand.red",
              borderColor: "brand.red",
              borderBottom: "none",
            }}
            borderBottomColor="brand.red"
          >
            Diamond
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>original!</p>
          </TabPanel>
          <TabPanel>
            <p>gold!</p>
          </TabPanel>
          <TabPanel>
            <p>diamond!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Box mt={40}>
        <Line />
      </Box>
    </Flex>
  );
};

export { MintedNFTsList };
