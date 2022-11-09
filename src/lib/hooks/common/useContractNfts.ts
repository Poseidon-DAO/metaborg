import { useQuery } from "wagmi";

export const ERC20Address = process.env.NEXT_PUBLIC_ERC20PDN;
export const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

interface IUseNftsForContract {
  contractAddress?: string;
}

async function getNftsForContract({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const response = await fetch(
    `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection?` +
      new URLSearchParams({ contractAddress })
  );

  return response.json();
}

const useContractNFTs = (props: IUseNftsForContract = {}) => {
  const query = useQuery(["nftsForContract"], {
    queryFn: () =>
      getNftsForContract({
        contractAddress: props?.contractAddress || ERC20Address!,
      }),
  });

  return {
    ...query,
    contractNfts: query.data ? query.data.nfts : query.data,
    areContractNftsLoading: query.isLoading,
    areContractNftsFetching: query.isFetching,
  };
};

export { useContractNFTs };
