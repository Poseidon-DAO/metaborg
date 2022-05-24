import { Header, Hero, JoinSection } from "components";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Header
        renderHero={({ videoSound }) => <Hero videoSound={videoSound} />}
      />

      <JoinSection />
    </div>
  );
};

export default Home;
