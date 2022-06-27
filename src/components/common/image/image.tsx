import NextImage from "next/image";
import { chakra } from "@chakra-ui/react";

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) => {
    return [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader",
      "layout",
      "objectFit",
    ].includes(prop);
  },
});

enum ImageLinks {
  AudioOn = "https://metaborg.io/wp-content/uploads/2022/01/audio_on.png",
  AudioOff = "https://metaborg.io/wp-content/uploads/2022/01/audio_off.png",
  Logo = "https://metaborg.io/wp-content/uploads/2022/01/metaborg-logo-bianco_ok.png",
  Signature = "https://metaborg.io/wp-content/uploads/2021/12/giovanni_motta_logo.png",
  SectionBackround = "https://metaborg.io/wp-content/uploads/2022/03/fascia-macchia1.png",
  Fighters = "https://metaborg.io/wp-content/uploads/2022/01/Metaborg2024_Fighters.jpg",
  RoadMap = "https://metaborg.io/wp-content/uploads/2022/01/sfondo_roadmap-scaled.jpg",
}

export { Image, ImageLinks };
