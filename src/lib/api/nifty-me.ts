import { NiftyUser } from "./types";

type FetchMyNiftieProfileFunction = ({
  token,
}: {
  token: string;
}) => Promise<NiftyUser>;

const fetchMyNiftyProfile: FetchMyNiftieProfileFunction = async ({ token }) => {
  const res = await fetch("https://api.niftygateway.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

const key = "me";

export { fetchMyNiftyProfile, key };
