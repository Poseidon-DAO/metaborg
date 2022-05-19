import type { NextPage } from "next";

import { Header, Hero } from "components";

const Home: NextPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Hero />
      <div className="w-screen h-48"></div>
    </div>
  );
};

export default Home;
