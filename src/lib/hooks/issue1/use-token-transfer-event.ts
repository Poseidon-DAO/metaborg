import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import MetaborgABI from "contracts/abis/Issue1.json";

interface IUseTokenTransferEventProps {
  address: string;
  eventName: string;
}

function useTokenTransferEvent({
  address,
  eventName,
}: IUseTokenTransferEventProps) {
  const { user, Moralis } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const chainId = {
    4: Moralis.Chains.ETH_RINKBEY,
    1: Moralis.Chains.ETH_MAINET,
  }[process.env.NEXT_PUBLIC_CHAIN_ID!];

  const abi = MetaborgABI.find((i) => i.name === eventName);

  const options = {
    chain: chainId,
    address: address || user?.get("ethAddress"),
    abi,
    topic: "TransferSingle(address, address, address, uint256, uint256)",
    tableName: "transfer_single",
    limit: 100,
  };

  const result = useMoralisWeb3ApiCall(
    Web3Api.native.getContractEvents,
    options
  );

  return { ...result };
}

export { useTokenTransferEvent };
