import { ImageLinks, MBImage } from "@metaborg/common";

import type { NextPage } from "next";

interface IAudioButtonProps {
  videoSound: boolean;
  toggleVideoSound: () => void;
}

const AudioButton: NextPage<IAudioButtonProps> = ({
  videoSound,
  toggleVideoSound,
}) => {
  return (
    <div className="w-6 cursor-pointer" onClick={toggleVideoSound}>
      <MBImage
        src={videoSound ? ImageLinks.AudioOn : ImageLinks.AudioOff}
        alt="toggle audio"
      />
    </div>
  );
};

export { AudioButton };
