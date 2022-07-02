import { useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";

interface IUseDistributionMetaData {
  deps?: any[];
  enabled?: boolean;
  onSuccess?: ({
    price,
    formatedPrice,
  }: {
    price: string;
    formatedPrice: number;
  }) => void;
  onError?: () => void;
}

const getPrice = (data: any[]) => (data ? data[0] : "");
const getFormatedPrice = (data: any[]) => (data ? data[0].toString() : "");

function useDistributionMetadata({
  deps = undefined,
  enabled = true,
  onSuccess,
  onError,
}: IUseDistributionMetaData) {
  const { fetch, data, isLoading, isFetching, error } = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS,
    functionName: "getDistributionMetaData",
    params: { _mangaDistributionID: "1" },
  });

  useEffect(() => {
    if (enabled) {
      fetch({
        onSuccess: (data: any) =>
          onSuccess?.({
            price: getPrice(data),
            formatedPrice: getFormatedPrice(data),
          }),
        onError,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || [enabled]);

  return {
    price: getPrice(data as any),
    formatedPrice: getFormatedPrice(data as any),
    isLoading,
    isFetching,
    error,
  };
}

export { useDistributionMetadata };
