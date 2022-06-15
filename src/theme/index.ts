import { extendTheme, type ThemeOverride } from "@chakra-ui/react";

import { colors, fonts, fontSizes, fontWeights, config } from "./foundations";
import { Button } from "./components";

const theme: ThemeOverride = extendTheme({
  colors,
  fonts,
  fontSizes,
  fontWeights,
  config,
  components: {
    Button,
  },
});

export { theme };
