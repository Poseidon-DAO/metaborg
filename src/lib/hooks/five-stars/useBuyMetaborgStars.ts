import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { ethers } from "ethers";

interface IUseBuyMetaborgStars {
  args: { salePrice: string };
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
}

const useBuyMetaborgStars = ({
  args,
  onSuccess,
  onError,
}: IUseBuyMetaborgStars) => {
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    abi: [
      {
        inputs: [],
        name: "buyMetaborgStars",
        outputs: [{ internalType: "uint8[]", name: "", type: "uint8[]" }],
        stateMutability: "payable",
        type: "function",
      },
    ],
    address: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
    functionName: "buyMetaborgStars",
    enabled: !!args?.salePrice,
    overrides: {
      from: address,
      value: ethers.utils.parseEther(args?.salePrice),
    },
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isFetching, isSuccess, error } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess,
    onError,
  });

  return {
    buy: write,
    buyData: data,
    isBuying: isLoading,
    isBuyFetching: isFetching,
    isBuyingSuccess: isSuccess,
    error,
  };
};

export { useBuyMetaborgStars };
