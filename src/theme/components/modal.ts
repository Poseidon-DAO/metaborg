import { mode } from "@chakra-ui/theme-tools";

const Modal = {
  baseStyle: (props: any) => ({
    dialog: {
      bg: mode("brand.white", "brand.modal")(props),
      borderRadius: "none",
    },
  }),
  defaultProps: {
    isCentered: true,
  },
};

export { Modal };
