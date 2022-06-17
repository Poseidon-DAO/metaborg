const Button = {
  baseStyle: {
    fontWeight: "bold",
  },
  sizes: {
    xl: {
      h: "96px",
      fontSize: "3xl",
      px: "62px",
    },
  },
  variants: {
    outline: {
      bg: "brand.transparent",
      border: "1px solid",
      borderColor: "brand.red",
      borderRadius: "none",
    },
    solid: (props: any) => ({
      bg: props.theme.colors.red,
      borderRadius: "none",
    }),
  },
  defaultProps: {
    size: "lg",
    variant: "outline",
  },
};

export { Button };
