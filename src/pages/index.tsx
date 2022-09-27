import { useRouter } from "next/router";

import { FullPageLoader } from "components/common";

import { type NextPage } from "next";

const initialPage = process.env.NEXT_PUBLIC_INITIAL_PAGE;

const Index: NextPage = () => {
  const { replace } = useRouter();

  if (!!initialPage) {
    replace(initialPage!);
  }

  return <FullPageLoader />;
};

export default Index;
