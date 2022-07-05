import { ListItem, UnorderedList } from "@chakra-ui/react";

import { Image } from "components/common";

import type { NextPage } from "next";

import discordLogo from "../../../../public/assets/discord-logo.svg";
import twitterLogo from "../../../../public/assets/twitter-logo.svg";
import instagramLogo from "../../../../public/assets/instagram-logo.svg";

interface ISocialLinksProps {
  size?: "sm" | "xl";
}

const imageSizes = {
  sm: 25,
  xl: 40,
};

const imageMargins = {
  sm: 6,
  xl: 10,
};

const SocialLinks: NextPage<ISocialLinksProps> = ({ size = "xl" }) => {
  const imageSize = imageSizes[size];
  const margin = imageMargins[size];

  return (
    <UnorderedList listStyleType="none">
      {[
        [discordLogo, "Discord", "https://discord.com/invite/2ABzB5YK4Z"],
        [twitterLogo, "Twitter", "https://twitter.com/metaborg2024"],
        [instagramLogo, "Instagram", "https://www.instagram.com/metaborg2024/"],
      ].map(([logo, label, link]) => (
        <ListItem
          key={label}
          mr={margin}
          display="inline-block"
          cursor="pointer"
          _hover={{ transform: "scale(1.05)" }}
        >
          <a href={link} target="_blank" rel="noreferrer">
            <Image
              src={logo}
              alt={label}
              width={imageSize}
              height={imageSize}
            />
          </a>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export { SocialLinks };
