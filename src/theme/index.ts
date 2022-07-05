import { extendTheme, type ThemeOverride } from "@chakra-ui/react";

import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  config,
  global,
} from "./foundations";
import { Button, Modal } from "./components";

const theme: ThemeOverride = extendTheme({
  colors,
  fonts,
  fontSizes,
  fontWeights,
  config,
  styles: { global },
  components: { Button, Modal },
});

export { theme };
