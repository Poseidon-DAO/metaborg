import { UseToastOptions } from "@chakra-ui/react";

function getDefaultToastConfig(params?: UseToastOptions): UseToastOptions {
  return {
    position: "top-right",
    title: "Please install Metamask extension",
    status: "error",
    duration: 6000,
    isClosable: true,
    variant: "solid",
    ...params,
  };
}

export { getDefaultToastConfig };
