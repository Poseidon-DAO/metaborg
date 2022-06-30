interface NiftyUser {
  username: string;
  name: string;
  profilePicUrl: string;
}

interface NiftiesApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Nifty[];
}

type NiftyNames = "ALWAYS" | "ALONE" | "NEVER NEXT";

interface Nifty {
  contractAddress: string;
  tokenId: string;
  name: NiftyNames;
  creator: NiftyUser;
  owner: NiftyUser & { airdropAddressEth: null };
}

export type { NiftyUser, Nifty, NiftiesApiResponse, NiftyNames };
