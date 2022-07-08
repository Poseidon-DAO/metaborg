import { useEffect } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

interface IUseContractNFTsProps {
  address?: string;
  contractAddress: string;
  deps?: any[];
  enabled?: boolean;
}

function useContractNFTs({
  contractAddress,
  address,
  deps,
  enabled,
}: IUseContractNFTsProps) {
  const { Moralis } = useMoralis();

  const chainId = {
    4: Moralis.Chains.ETH_RINKBEY,
    1: Moralis.Chains.ETH_MAINET,
  }[process.env.NEXT_PUBLIC_CHAIN_ID!];

  const Web3Api = useMoralisWeb3Api();
  const { fetch, ...data } = useMoralisWeb3ApiCall(Web3Api.account.getNFTs, {
    chain: chainId,
    // token_address: contractAddress,
    address: address || "",
  });

  const dependencies = [...(deps || []), enabled];

  useEffect(() => {
    if (enabled) {
      fetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    ...data,
    result: data?.data?.result,
    filteredResult: data?.data?.result?.filter(
      (nft) => nft.token_address.toLowerCase() === contractAddress.toLowerCase()
    ),
  };
}

export { useContractNFTs };
