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
    phone: string;
    email: string;
    address: string;
    state: string;
    zip: string;
    tokenId: string;
  };
}

const useBurnDataSubmit = ({
  data: { name, phone, email, address, state, zip, tokenId },
  enabled,
}: IUseBurnDataSubmit & { enabled?: boolean }) => {
  const query = useQuery(
    [key, name, phone, email, address, state, zip, tokenId],
    {
      queryFn: () =>
        submitData({ name, phone, email, address, state, zip, tokenId }),
      enabled:
        !!name &&
        !!phone &&
        !!email &&
        !!address &&
        !!state &&
        !!zip &&
        !!tokenId &&
        enabled,
    }
  );

  return query;
};

export { useBurnDataSubmit };
