import { type NextPage } from "next";
import { LandingLayout } from "layout/landing";
import { Hero, Issue1Section, JoinSection, Header } from "components/landing";

const Landing: NextPage = () => {
  return (
    <LandingLayout>
      <Header
        renderHero={({ videoSound }) => <Hero videoSound={videoSound} />}
      />
      <JoinSection />
      <Issue1Section />
      {/* <RoadMap /> */}
    </LandingLayout>
  );
};

export default Landing;
