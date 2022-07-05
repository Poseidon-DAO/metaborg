import { Image, ImageLinks } from "components/common";

import type { NextPage } from "next";

const RoadMap: NextPage = () => {
  return (
    <section className="w-screen h-[145vh] pt-16 pb-20 px-3 relative -z-10 border-white border-2 overflow-hidden">
      <div className="absolute top-0 w-full h-full">
        <Image src={ImageLinks.RoadMap} alt="" />
      </div>

      <div className="text-white">RoadMap</div>
    </section>
  );
};

export { RoadMap };
