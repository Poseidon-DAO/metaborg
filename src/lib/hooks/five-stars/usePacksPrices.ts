// TODO TS types are not fully set properly
import {
  useWeb3ExecuteFunction,
  Web3ExecuteFunctionFetchOptions,
  Web3ExecuteFunctionParameters,
  UseWeb3ExecuteFunctionOptions,
} from "react-moralis";

import FiveStarsABI from "contracts/abis/FiveStars.json";

const makeOptions = (
  index: number | undefined
): Web3ExecuteFunctionParameters => ({
  contractAddress: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS,
  abi: FiveStarsABI,
  functionName: "prices",
  params: {
    "": index ?? "",
  },
  msgValue: 0,
});

type IFetchArgs = Omit<Web3ExecuteFunctionFetchOptions, "params"> & {
  params?: { index?: number };
};

type A<T> = T extends number
  ? {
      index: T;
      options?: UseWeb3ExecuteFunctionOptions;
    }
  : never;

function usePacksPrices<T>(props: A<T>) {
  const result = useWeb3ExecuteFunction(
    makeOptions(props?.index),
    props?.options
  );

  return {
    ...result,
    fetchPacksPrices: (args: any) => {
      result.fetch({ ...args, params: makeOptions(args?.params?.index) });
    },
    packsPrices: !!result.data ? Number(result.data) : undefined,
  };
}

export { usePacksPrices };
