import { type NextPage } from "next";
import { LandingLayout } from "layout/landing";
import {
  Hero,
  Issue1Section,
  JoinSection,
  LandingHeader,
} from "components/landing";

const Landing: NextPage = () => {
  return (
    <LandingLayout>
      <LandingHeader
        renderHero={({ videoSound }) => <Hero videoSound={videoSound} />}
      />
      <JoinSection />
      <Issue1Section />
      {/* <RoadMap /> */}
    </LandingLayout>
  );
};

export default Landing;
