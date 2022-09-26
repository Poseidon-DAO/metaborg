const firstPackagePrice = process.env.NEXT_PUBLIC_FIRST_PACKAGE_PRICE;
const secondPackagePrice = process.env.NEXT_PUBLIC_SECOND_PACKAGE_PRICE;
const thirdPackagePrice = process.env.NEXT_PUBLIC_THIRD_PACKAGE_PRICE;

const data = [
  {
    id: "1",
    amount: 1,
    price: firstPackagePrice!,
    imageUrl: "/assets/five-stars/FS_NFTS_1.jpg",
  },
  {
    id: "2",
    amount: 3,
    price: secondPackagePrice!,
    imageUrl: "/assets/five-stars/FS_NFTS_3.jpg",
  },
  {
    id: "3",
    amount: 5,
    price: thirdPackagePrice!,
    imageUrl: "/assets/five-stars/FS_NFTS_5.jpg",
  },
];

export default data;
