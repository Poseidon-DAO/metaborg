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
  contractAddress?: string;
  tokenId: string;
  name: NiftyNames;
  creator?: NiftyUser;
  owner?: NiftyUser & { airdropAddressEth: null };
}

interface NFT {
  token_address: string;
  token_id: string;
  contract_type: string;
  owner_of: string;
  block_number: string;
  block_number_minted: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
}

export type { NiftyUser, Nifty, NiftiesApiResponse, NiftyNames, NFT };
