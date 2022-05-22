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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://metaborg.io/wp-content/uploads/2022/01/audio_${
          videoSound ? "on" : "off"
        }.png`}
        alt="toggle audio"
      />
    </div>
  );
};

export { AudioButton };
