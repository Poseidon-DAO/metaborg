import { Box } from "@chakra-ui/react";
import { NextPage } from "next";

import { MintItem } from "../mint-item";

const data = [
  {
    id: "1",
    amount: 1,
    imageUrl: "/assets/five-stars/FS_NFTS_3.jpg",
    price: "0.001",
  },
  {
    id: "2",
    amount: 3,
    imageUrl: "/assets/five-stars/FS_NFTS_3.jpg",
    price: "0.002",
  },
  {
    id: "3",
    amount: 5,
    imageUrl: "/assets/five-stars/FS_NFTS_5.jpg",
    price: "0.003",
  },
];

interface IMintSectionProps {
  maxPages?: number;
}

const MintSection: NextPage<IMintSectionProps> = ({ maxPages }) => {
  const filteredData = maxPages
    ? data.filter((item) => item.amount <= maxPages)
    : data;

  return (
    <Box py={4}>
      {filteredData.map((item) => (
        <MintItem key={item.id} {...item} />
      ))}
    </Box>
  );
};

export { MintSection };
