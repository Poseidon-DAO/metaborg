import { type NextPage } from "next";
import { Box, Flex, Text } from "@chakra-ui/react";
import { PageContainer } from "components/common";

const Footer: NextPage = () => {
  return (
    <Box bg="brand.red">
      <PageContainer>
        <Flex align="center" justify="space-between">
          <Box>
            <Text>Footer</Text>
          </Box>
        </Flex>
      </PageContainer>
    </Box>
  );
};

export { Footer };
