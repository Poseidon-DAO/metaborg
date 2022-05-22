import type { NextPage } from "next";

interface IHeroProps {
  videoSound: boolean;
}

const Hero: NextPage<IHeroProps> = ({ videoSound }) => {
  return (
    <section className="h-screen">
      <video
        src="https://metaborg.io/wp-content/uploads/2022/03/Teaser_website_2022_ok.mp4"
        autoPlay
        loop
        muted={!videoSound}
      ></video>
    </section>
  );
};

export { Hero };
