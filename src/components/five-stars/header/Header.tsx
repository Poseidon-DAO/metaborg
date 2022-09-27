import { Box, Image } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box>
      <Box position="absolute" left={0} top={0}>
        <Image
          height={["140px", "initial"]}
          objectFit="cover"
          objectPosition={["-120px 0px", "initial"]}
          src="assets/five-stars-cover.jpg"
          alt="cover"
        />
      </Box>
    </Box>
  );
};

export { Header };
