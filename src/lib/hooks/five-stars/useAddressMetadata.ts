import { useAccount, useContractRead } from "wagmi";

import FiveStarsABI from "contracts/abis/FiveStars.json";
import { BigNumber } from "ethers";

export interface IFormatedAddressMetadata {
  amounts: number[];
  prices: number[];
}

function formatResult(data: BigNumber[]) {
  const middleOfArray = data.length / 2;

  return {
    amounts: data.slice(0, middleOfArray).map((e: BigNumber) => Number(e)),
    prices: data
      .slice(middleOfArray, data.length)
      .map((e: BigNumber) => Number(e)),
  };
}

const useAddressMetadata = () => {
  const { address, isConnected } = useAccount();

  const query = useContractRead({
    abi: FiveStarsABI,
    functionName: "getAddressMetadata",
    address: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
    args: [address || "0x0000000000000000000000000000000000000001"],
    enabled: !!isConnected,
  });

  return {
    ...query,
    addressMetadata: !!query.data
      ? formatResult(query.data as BigNumber[])
      : undefined,
    areAddressMetadataLoading: query.isLoading,
    areAddressMetadataFetching: query.isFetching,
    addressMetadataError: query.error,
  };
};

export { useAddressMetadata };
