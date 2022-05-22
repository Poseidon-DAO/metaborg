import type { NextPage } from "next";

import { Header, Hero } from "components";

const Home: NextPage = () => {
  console.log("homne rendered");
  return (
    <div className="overflow-x-hidden">
      <Header
        renderHero={({ videoSound }) => <Hero videoSound={videoSound} />}
      />

      <div className="w-screen h-48"></div>
    </div>
  );
};

export default Home;
