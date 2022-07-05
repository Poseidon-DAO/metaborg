import { NiftiesApiResponse } from "./types";

type FetchNiftiesFunction = ({
  token,
  username,
  contractAddress,
}: {
  token: string;
  username: string;
  contractAddress: string;
}) => Promise<NiftiesApiResponse>;

const nftsMock = [
  {
    contractAddress: "0x8c167a1dbf8e19d18705382d6a457491589f9598",
    tokenId: "NEVER NEXT",
    name: "NEVER NEXT",
    creator: {
      username: "billelis",
      name: "Billelis",
      profilePicUrl:
        "https://res.cloudinary.com/nifty-gateway/image/upload/v1606249630/aekrzlaq22zxnyvairbo.jpg",
    },
    owner: {
      username: "tommy",
      name: "tommyk.eth",
      profilePicUrl:
        "https://res.cloudinary.com/nifty-gateway/image/upload/v1625617848/uiflc4iaky3k6hh8nrqh.png",
    },
  },
  {
    contractAddress: "0xc92ceddfb8dd984a89fb494c376f9a48b999aafc",
    tokenId: "ALONE",
    name: "ALONE",
    creator: {
      username: "creatureworld",
      name: "Creature World",
      profilePicUrl:
        "https://res.cloudinary.com/nifty-gateway/image/upload/v1630692687/wtalars9l78kggjfqeqt.jpg",
    },
    owner: {
      username: "tommy",
      name: "tommyk.eth",
      profilePicUrl:
        "https://res.cloudinary.com/nifty-gateway/image/upload/v1625617848/uiflc4iaky3k6hh8nrqh.png",
    },
  },
];

const useNifiesMock = process.env.NEXT_PUBLIC_NG_USE_NIFTIES_MOCK === "true";

const fetchNifties: FetchNiftiesFunction = async ({
  token,
  username,
  contractAddress,
}) => {
  const res = await fetch(
    `https://api.niftygateway.com/v1/users/${username}/nifties/?contractAddress=${contractAddress}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();

  return {
    ...data,
    results: useNifiesMock ? nftsMock : data.results,
  };
};

const key = "nifties";

export { fetchNifties, key };
