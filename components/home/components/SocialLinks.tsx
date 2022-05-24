import { MBImage } from "@metaborg/common";

import type { NextPage } from "next";

import discordLogo from "public/assets/discord-logo.svg";
import twitterLogo from "public/assets/twitter-logo.svg";
import instagramLogo from "public/assets/instagram-logo.svg";

const SocialLinks: NextPage = () => {
  return (
    <ul className="flex">
      {[
        [discordLogo, "Discord"],
        [twitterLogo, "Twitter"],
        [instagramLogo, "Instagram"],
      ].map(([logo, label]) => (
        <li
          key={label}
          className="mr-6 flex items-center cursor-pointer hover:scale-110"
        >
          <MBImage nextImage src={logo} alt={label} width={25} height={25} />
        </li>
      ))}
    </ul>
  );
};

export { SocialLinks };
