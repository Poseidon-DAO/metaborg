import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";

interface IUseContractCallProps {
  functionName: string;
  salePrice?: number | string;
  params?: Record<any, any>;
}

function useContractCall({
  salePrice,
  functionName,
  params,
}: IUseContractCallProps) {
  const result = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS,
    functionName,
    params: {
      ...params,
    },
    ...(salePrice && {
      msgValue: salePrice,
    }),
  });

  return result;
}

export { useContractCall };
