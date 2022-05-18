import type { NextPage } from "next";

const AudioButton: NextPage = () => {
  return (
    <div className="w-6 cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://metaborg.io/wp-content/uploads/2022/01/audio_off.png"
        alt="toggle audio"
      />
    </div>
  );
};

export { AudioButton };
