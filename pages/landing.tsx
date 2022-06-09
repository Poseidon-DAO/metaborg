import { Hero, Issue1Section, JoinSection, LandingHeader } from "components";

import { NextPage } from "next";

const Landing: NextPage = () => {
  return (
    <div className="bg-black">
      <LandingHeader
        renderHero={({ videoSound }) => <Hero videoSound={videoSound} />}
      />
      <JoinSection />
      <Issue1Section />
      {/* <RoadMap /> */}
    </div>
  );
};

export default Landing;
