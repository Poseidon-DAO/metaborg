import { type NextPage } from "next";
import { LandingLayout } from "layout/landing";
import { Hero, Issue1Section, JoinSection, Header } from "components/landing";
import { useLayoutEffect } from "react";
import { useRouter } from "next/router";

const Landing: NextPage = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push("/"); // this is temporary because we are using the wordpress landing page
  });

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
