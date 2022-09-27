import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { BigNumber } from "ethers";

import FiveStarsABI from "contracts/abis/FiveStars.json";

interface IUseAddressMetadata {
  address?: string;
  autoFetch?: boolean;
}

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

function useAddressMetadata({ address, autoFetch }: IUseAddressMetadata = {}) {
  const { user } = useMoralis();

  const result = useWeb3ExecuteFunction(
    {
      contractAddress: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS,
      abi: FiveStarsABI,
      functionName: "getAddressMetadata",
      params: {
        _address: address || user?.get("ethAddress"),
      },
    },
    { autoFetch }
  );

  return {
    ...result,
    fetchAddressMetadata: result.fetch,
    addressMetadata: !!result.data
      ? formatResult(result.data as BigNumber[])
      : undefined,
  };
}

export { useAddressMetadata };
