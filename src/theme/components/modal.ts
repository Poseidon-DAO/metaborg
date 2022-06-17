import { mode } from "@chakra-ui/theme-tools";

const Modal = {
  baseStyle: (props: any) => ({
    dialog: {
      bg: mode("white", "green")(props),
    },
  }),
};

export { Modal };
