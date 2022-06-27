import { ListItem, UnorderedList } from "@chakra-ui/react";

import { Image } from "components/common";

import type { NextPage } from "next";

import discordLogo from "../../../../public/assets/discord-logo.svg";
import twitterLogo from "../../../../public/assets/twitter-logo.svg";
import instagramLogo from "../../../../public/assets/instagram-logo.svg";

const SocialLinks: NextPage = () => {
  return (
    <UnorderedList listStyleType="none">
      {[
        [discordLogo, "Discord"],
        [twitterLogo, "Twitter"],
        [instagramLogo, "Instagram"],
      ].map(([logo, label]) => (
        <ListItem
          key={label}
          mr={6}
          display="inline-block"
          cursor="pointer"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Image src={logo} alt={label} width={25} height={25} />
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export { SocialLinks };
