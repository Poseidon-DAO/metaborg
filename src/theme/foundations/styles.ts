import { mode } from "@chakra-ui/theme-tools";

const global = (props: any) => ({
  body: {
    bg: mode("brand.white", "brand.black")(props),
  },
});

export { global };
