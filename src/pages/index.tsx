import { useLayoutEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FullPageLoader } from "components/common";

const initialPage = process.env.NEXT_PUBLIC_INITIAL_PAGE;

const Index: NextPage = () => {
  const { push } = useRouter();

  useLayoutEffect(() => {
    if (!!initialPage) {
      push(initialPage!);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return <FullPageLoader />;
};

export default Index;
