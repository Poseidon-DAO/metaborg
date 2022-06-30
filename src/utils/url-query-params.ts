const getNiftyRedirectUrl = () => {
  const niftyGatewayUrl = new URL("https://niftygateway.com/authorize");

  niftyGatewayUrl.searchParams.append("scope", "profile:read");
  niftyGatewayUrl.searchParams.append("response_type", "token");
  niftyGatewayUrl.searchParams.append(
    "client_id",
    process.env.NEXT_PUBLIC_NG_CLIENT_ID!
  );
  niftyGatewayUrl.searchParams.append(
    "redirect_uri",
    process.env.NEXT_PUBLIC_NG_REDIRECT_URI!
  );
  niftyGatewayUrl.searchParams.append(
    "state",
    process.env.NEXT_PUBLIC_NG_STATE!
  );

  return niftyGatewayUrl;
};

export { getNiftyRedirectUrl };
