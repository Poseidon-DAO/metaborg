import { type NextPage } from "next";
import { Box, Flex, Text } from "@chakra-ui/react";
import { PageContainer } from "components/common";

const Footer: NextPage = () => {
  return (
    <Box py={10} borderTop="2px solid" borderColor="brand.red">
      <PageContainer>
        <Flex align="center" justify="space-between">
          <Box>
            <Text>All Rights Reserved</Text>
          </Box>
        </Flex>
      </PageContainer>
    </Box>
  );
};

export { Footer };
