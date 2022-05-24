import Link from "next/link";
import { Typography } from "@metaborg/ui";

import type { NextPage } from "next";

export const sections = [
  { label: "Issue#1", sectionId: "#issue1" },
  { label: "Roeadmap", sectionId: "#roadmap" },
  { label: "About", sectionId: "#about" },
  { label: "FAQS", sectionId: "#faqs" },
  { label: "Join", sectionId: "#join", focus: true },
];

const Navbar: NextPage = () => {
  return (
    <>
      <ul className="hidden lg:flex">
        {sections.map(({ label, sectionId, focus = false }) => (
          <li
            key={sectionId}
            className={`flex items-center text-white hover:text-red pr-6 text-lg ${
              focus ? "text-red" : "text-white"
            }`}
          >
            <Link href={sectionId}>
              <a>
                <Typography variant="p">{label}</Typography>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export { Navbar };
