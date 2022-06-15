import { type NextPage } from "next";
import { ImageLinks, MBImage } from "@metaborg/common";
import { Button, Spacer, Typography } from "@metaborg/ui";

const JoinSection: NextPage = () => {
  return (
    <section className="w-screen pt-16 pb-20 px-3">
      <div className="mx-60 flex flex-col items-center">
        <Typography className="uppercase text-red" variant="p">
          Art by
        </Typography>

        <MBImage src={ImageLinks.Signature} alt="Signature" />
        <Spacer height={30} />
        <Button
          variant="outlined"
          href="https://join.metaborg.io/"
          target="_blank"
        >
          Join Metaborg
        </Button>
      </div>
    </section>
  );
};

export { JoinSection };
