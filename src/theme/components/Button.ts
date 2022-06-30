const Button = {
  baseStyle: {
    fontWeight: "bold",
  },
  sizes: {
    sm: {
      h: "40px",
      fontSize: "sm",
      px: "14px",
    },
    lg: {
      h: "76px",
      fontSize: "2xl",
      px: "42px",
    },
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
