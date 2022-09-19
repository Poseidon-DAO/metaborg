import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FullPageLoader } from "components/common";

const initialPage = process.env.NEXT_PUBLIC_INITIAL_PAGE;

const Index: NextPage = () => {
  const { push } = useRouter();
  const { isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (!!initialPage && isWeb3Enabled) {
      push(initialPage!);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled]);

  return <FullPageLoader />;
};

export default Index;
