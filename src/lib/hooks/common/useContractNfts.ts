import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

interface IUseContractNFTsProps {
  address?: string;
  contractAddress?: string;
}

function useContractNFTs({ contractAddress, address }: IUseContractNFTsProps) {
  const { Moralis, user } = useMoralis();

  const chainId = {
    4: Moralis.Chains.ETH_RINKBEY,
    1: Moralis.Chains.ETH_MAINET,
    420: Moralis.Chains.ETH_GOERLI,
  }[process.env.NEXT_PUBLIC_CHAIN_ID!];

  const Web3Api = useMoralisWeb3Api();

  const result = useMoralisWeb3ApiCall(Web3Api.account.getNFTsForContract, {
    chain: chainId,
    token_address:
      contractAddress || process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
    address: address || user?.get("ethAddress"),
  });

  return {
    ...result,
    fetchContractNfts: result.fetch,
    contractNfts: result.data,
  };
}

export { useContractNFTs };
