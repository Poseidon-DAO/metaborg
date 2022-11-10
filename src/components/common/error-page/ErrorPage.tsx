import { useRouter } from "next/router";
import { Box, Button, Heading } from "@chakra-ui/react";

const ErrorPage = () => {
  const router = useRouter();

  function handleReload() {
    router.reload();
  }

  return (
    <Box textAlign="center" pt="50vh">
      <Heading>Ooopss...!</Heading>
      <Heading>Something went wrong!</Heading>

      <Button mt={8} onClick={handleReload}>
        Reload Page
      </Button>
    </Box>
  );
};

export { ErrorPage };
