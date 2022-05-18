import type { NextPage } from "next";

const Logo: NextPage = () => {
  return (
    <div className="w-36 lg:w-48 mx-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://metaborg.io/wp-content/uploads/2022/01/metaborg-logo-bianco_ok.png"
        alt="logo"
      />
    </div>
  );
};

export { Logo };
