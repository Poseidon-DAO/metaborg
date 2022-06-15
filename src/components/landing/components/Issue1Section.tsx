import { ImageLinks, MBImage } from "@metaborg/common";
import { Button, Spacer, Typography } from "@metaborg/ui";

import type { NextPage } from "next";

const Issue1Section: NextPage = () => {
  return (
    <section className="py-[170px] pb-20 px-3 h-auto relative border-2 border-white">
      <div className="absolute top-0">
        <MBImage src={ImageLinks.SectionBackround} alt="" />
      </div>

      <div className="relative">
        <div className="absolute top-0 -z-10 opacity-20">
          <MBImage src={ImageLinks.Fighters} alt="" />
        </div>

        <div className="mb-5">
          <Typography
            variant="h2"
            className="text-red font-semibold text-center"
          >
            Issue #1
          </Typography>
        </div>

        <div className="w-2/3 my-0 mx-auto text-white text-[22px] text-center px-48">
          <Typography>2024</Typography>

          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            perspiciatis inventore distinctio quisquam dolorum numquam soluta
            culpa consequuntur, doloremque ab, tempora assumenda reprehenderit
            quis explicabo blanditiis minus.
          </Typography>

          <br />

          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            perspiciatis inventore distinctio quisquam dolorum numquam soluta
            culpa consequuntur, doloremque ab, tempora assumenda reprehenderit
            quis explicabo blanditiis minus.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export { Issue1Section };
