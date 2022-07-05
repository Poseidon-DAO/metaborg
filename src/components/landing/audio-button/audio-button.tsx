import { Box } from "@chakra-ui/react";
import { Image, ImageLinks } from "components/common";

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
    <Box cursor="pointer" onClick={toggleVideoSound}>
      <Image
        src={videoSound ? ImageLinks.AudioOn : ImageLinks.AudioOff}
        alt="toggle audio"
        width={30}
        height={30}
      />
    </Box>
  );
};

export { AudioButton };
