/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ComponentProps } from "react";
import Image, { ImageProps } from "next/image";

import type { NextPage } from "next";

enum ImageLinks {
  AudioOn = "https://metaborg.io/wp-content/uploads/2022/01/audio_on.png",
  AudioOff = "https://metaborg.io/wp-content/uploads/2022/01/audio_off.png",
  Logo = "https://metaborg.io/wp-content/uploads/2022/01/metaborg-logo-bianco_ok.png",
  Signature = "https://metaborg.io/wp-content/uploads/2021/12/giovanni_motta_logo.png",
  SectionBackround = "https://metaborg.io/wp-content/uploads/2022/03/fascia-macchia1.png",
  Fighters = "https://metaborg.io/wp-content/uploads/2022/01/Metaborg2024_Fighters.jpg",
  RoadMap = "https://metaborg.io/wp-content/uploads/2022/01/sfondo_roadmap-scaled.jpg",
}

interface ExtendedProps {
  alt: string;
  src: ImageLinks;
}

interface HtmlImageProps extends ComponentProps<"img"> {
  nextImage?: false;
}

interface NextImageProps extends ImageProps {
  nextImage?: true;
}

type IMBImageProps = (HtmlImageProps | NextImageProps) & ExtendedProps;

const MBImage: NextPage<IMBImageProps> = ({ nextImage = false, ...props }) => {
  if (nextImage) return <Image {...(props as NextImageProps)} />;

  return <img {...(props as HtmlImageProps)} />;
};

export { MBImage, ImageLinks };
