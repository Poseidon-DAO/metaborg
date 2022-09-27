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

export const makeSectionData = (
  metadata: IFormatedAddressMetadata = { prices: [], amounts: [] }
) => {
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
