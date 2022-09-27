import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import FiveStarsABI from "contracts/abis/FiveStars.json";
interface IUseBuyMetaborgStarsProps {
  salePrice: number | string;
}

function useBuyMetaborgStars({ salePrice }: IUseBuyMetaborgStarsProps) {
  const { Moralis } = useMoralis();

  const makeOptions = (salePrice: number | string) => ({
    abi: FiveStarsABI,
    contractAddress: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS,
    functionName: "buyMetaborgStars",
    msgValue: Moralis.Units.ETH(salePrice || 0),
  });

  const result = useWeb3ExecuteFunction(makeOptions(salePrice));

  return {
    ...result,
    buyMetaborgStar: result.fetch,
  };
}

export { useBuyMetaborgStars };
