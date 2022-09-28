import { useEffect } from "react";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";

interface IUseNFTsProps {
  address?: string;
  deps?: any[];
  enabled?: boolean;
}

function useNFTs({ address, deps = undefined, enabled = true }: IUseNFTsProps) {
  const { user, Moralis } = useMoralis();
  const chainId = {
    4: Moralis.Chains.ETH_RINKBEY,
    1: Moralis.Chains.ETH_MAINET,
    420: Moralis.Chains.ETH_GOERLI,
  }[process.env.NEXT_PUBLIC_CHAIN_ID!];

  const Web3Api = useMoralisWeb3Api();
  const { fetch, ...result } = useMoralisWeb3ApiCall(Web3Api.account.getNFTs, {
    chain: chainId,
    address: address || user?.get("ethAddress"),
  });

  const dependencies = [...(deps || []), enabled];

  useEffect(() => {
    if (enabled) {
      fetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return result;

  // 0xCD9B7C63f1C8318c2A510415fefd5d1c6eC71DBb
}

export { useNFTs };
