import { EditionItem } from "./edition-utils";

import aloneEdition from "../../../../public/assets/editions/Alone.jpg";
import alwaysEdition from "../../../../public/assets/editions/Always.jpg";
import neverNextEdition from "../../../../public/assets/editions/Never_Next.png";

export const EDITIONS_DATA: EditionItem[] = [
  {
    no: 1,
    name: "NEVER NEXT",
    editionType: "Ranked Auction",
    format: "video",
    cover: neverNextEdition.src,
    benefits: {
      1: {
        main: "One free Diamond Metaborg Manga NFT and one edition of future issues.",
        subs: [],
      },
      2: {
        main: "One free Diamond Metaborg Manga NFT and one edition of future issues.",
        subs: [
          "Limited edition of Metaborg physical Manga printed, signed",
          "Limited edition physical poster signed",
          "Screen printed stcikers package (no 7 pieces).",
        ],
      },
    },
  },
  {
    no: 2,
    name: "ALWAYS",
    editionType: "Limited Edition",
    format: "video",
    cover: alwaysEdition.src,
    benefits: {
      1: {
        main: "One free Gold Metaborg Manga NFT and one edition of issue #2",
        subs: [],
      },
    },
  },
  {
    no: 3,
    name: "ALONE",
    editionType: "Open Edition",
    format: "image",
    cover: aloneEdition.src,
    benefits: {
      1: {
        main: "Pass to mint one Metaborg NFT on www.metaborg.io for the price of 0.1 ETH",
        subs: [],
      },
    },
  },
];
