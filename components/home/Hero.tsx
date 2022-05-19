import type { NextPage } from "next";

const Hero: NextPage = () => {
  return (
    <section className="h-screen">
      <video
        src="https://metaborg.io/wp-content/uploads/2022/03/Teaser_website_2022_ok.mp4"
        autoPlay
        loop
        muted
        width="100%"
      ></video>
    </section>
  );
};

export { Hero };
