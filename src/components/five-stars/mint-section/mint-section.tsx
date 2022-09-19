import { Box } from "@chakra-ui/react";

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

const MintSection = () => {
  return (
    <Box py={4}>
      {data.map((item) => (
        <MintItem key={item.id} {...item} />
      ))}
    </Box>
  );
};

export { MintSection };
