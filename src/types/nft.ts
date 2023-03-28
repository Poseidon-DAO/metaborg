export interface Nft {
  contract: Contract;
  id: ID;
  balance: string;
  title: string;
  description: string;
  tokenUri: TokenURI;
  media: Media[];
  metadata: Metadata;
  timeLastUpdated: Date;
  contractMetadata: ContractMetadata;
}

export interface Contract {
  address: string;
}

export interface ContractMetadata {
  name: string;
  symbol: string;
  tokenType: string;
  contractDeployer: string;
  deployedBlockNumber: number;
  openSea: OpenSea;
}

export interface OpenSea {
  lastIngestedAt: Date;
}

export interface ID {
  tokenId: string;
  tokenMetadata: TokenMetadata;
}

export interface TokenMetadata {
  tokenType: string;
}

export interface Media {
  gateway: string;
  thumbnail: string;
  raw: string;
  format: string;
  bytes: number;
}

export interface Metadata {
  description: string;
  external_url: string;
  image: string;
  name: string;
}

export interface TokenURI {
  gateway: string;
  raw: string;
}
