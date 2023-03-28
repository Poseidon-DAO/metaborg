import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { BigNumber } from "ethers";

interface IUseBurnProps {
  args: { email: string; tokenId: string };
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  enabled?: boolean;
}

const useBurn = ({ args, onSuccess, onError, enabled }: IUseBurnProps) => {
  const { email, tokenId } = args;

  const { config } = usePrepareContractWrite({
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "_tokenID", type: "uint256" },
          { internalType: "string", name: "_email", type: "string" },
        ],
        name: "burnAndReceivePhysicalEdition",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    address: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
    functionName: "burnAndReceivePhysicalEdition",
    enabled: !!(email && tokenId) && enabled,
    args: [BigNumber.from(tokenId), email],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isFetching, isSuccess, error, status } =
    useWaitForTransaction({
      hash: data?.hash,
      onSuccess,
      onError,
    });

  return {
    burn: write,
    burnData: data,
    isBurning: isLoading,
    isBurnFetching: isFetching,
    isBurnSuccess: isSuccess,
    error,
    burnStatus: status,
  };
};

export { useBurn };
