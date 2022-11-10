import { Flex, Spinner } from "@chakra-ui/react";

const FullPageLoader = () => {
  return (
    <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
      <Spinner color="brand.red" size="xl" />
    </Flex>
  );
};

export { FullPageLoader };
