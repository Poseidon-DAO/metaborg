import Link from "next/link";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";

import type { NextPage } from "next";

export const sections = [
  { label: "Issue#1", sectionId: "#issue1" },
  { label: "Roeadmap", sectionId: "#roadmap" },
  { label: "About", sectionId: "#about" },
  { label: "FAQS", sectionId: "#faqs" },
  {
    label: "Join",
    sectionId: "https://join.metaborg.io/",
    focus: true,
    target: "_blank",
  },
];

const Navbar: NextPage = () => {
  return (
    <UnorderedList listStyleType="none">
      {sections.map(({ label, sectionId, focus = false, target = "" }) => (
        <ListItem
          key={sectionId}
          display="inline-block"
          pr={6}
          fontSize="large"
          color={focus ? "brand.red" : "brand.white"}
          _hover={{ color: "brand.red" }}
        >
          <Link href={sectionId} passHref={!!target}>
            <a target={target} rel="noopener noreferrer">
              <Text>{label}</Text>
            </a>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export { Navbar };
