import { IFormatedAddressMetadata } from "lib/hooks/five-stars";

export interface IDataItem {
  id: string;
  amount: number;
  price: string;
  imageUrl: string;
}

const imageUrls: Record<number, string> = {
  1: "/assets/five-stars/FS_NFTS_1.jpg",
  3: "/assets/five-stars/FS_NFTS_3.jpg",
  5: "/assets/five-stars/FS_NFTS_5.jpg",
};

const unAuthedData = [
  {
    id: "1",
    amount: 1,
    price: "0",
    imageUrl: imageUrls[1],
  },
  {
    id: "2",
    amount: 3,
    price: "0",
    imageUrl: imageUrls[3],
  },
  {
    id: "3",
    amount: 5,
    price: "0",
    imageUrl: imageUrls[5],
  },
];

export const makeSectionData = (
  metadata: IFormatedAddressMetadata = { prices: [], amounts: [] }
) => {
  if (!metadata.prices.length) return unAuthedData;

  return metadata.amounts.reduce<IDataItem[]>((acc, current, index) => {
    const item = {
      id: (index + 1).toString(),
      amount: current,
      price: metadata.prices[index].toString(),
      imageUrl: imageUrls[current],
    };

    acc.push(item);

    return acc;
  }, []);
};
