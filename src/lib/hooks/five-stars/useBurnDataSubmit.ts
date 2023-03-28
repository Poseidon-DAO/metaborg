import { useQuery } from "wagmi";

const key = "burnDataSubmit";

async function submitData(
  submitProps: IUseBurnDataSubmit["data"],
  { json }: { json?: boolean } = { json: true }
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PDN_API_URL!}/artists/metaborg`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitProps),
    }
  );

  if (json) {
    return response.json();
  }

  return response;
}

interface IUseBurnDataSubmit {
  data: {
    name: string;
    email: string;
    address: string;
    tokenId: string;
  };
}

const useBurnDataSubmit = ({
  data: { name, email, address, tokenId },
  enabled,
}: IUseBurnDataSubmit & { enabled?: boolean }) => {
  const query = useQuery([key, name, email, address, tokenId], {
    queryFn: () => submitData({ name, email, address, tokenId }),
    enabled: !!name && !!email && !!address && !!tokenId && enabled,
  });

  return query;
};

export { useBurnDataSubmit };
