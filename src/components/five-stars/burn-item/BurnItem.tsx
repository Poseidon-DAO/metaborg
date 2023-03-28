import {
  Box,
  Button,
  Image,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import { type Nft } from "types/nft";
import { BurnModal } from "../burn-modal";

interface IProps extends Nft {}

const BurnItem: NextPage<IProps> = ({ id, metadata }) => {
  const disClosureProps = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);

  function handleBurn() {
    disClosureProps.onOpen();
  }

  return (
    <Box textAlign="center">
      <BurnModal {...disClosureProps} tokenId={id.tokenId} />

      <Box position="relative" overflow="hidden" border="1px solid white">
        <Image
          transition="transform .4s"
          transform={isHovered ? "scale(1.08)" : "scale(1.02)"}
          src={metadata.image}
          alt="nft to mint"
        />

        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.7) 80%,
            rgba(0, 0, 0, 0.9) 100%
          )"
          display="flex"
          alignItems="flex-end"
          p="4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Text color="border" fontWeight="extrabold" fontSize="2xl">
            Token ID: {Number(id?.tokenId)}
          </Text>
        </Box>
      </Box>

      <Box
        border="1px dotted"
        margin="0 auto"
        borderColor="brand.red"
        w="2px"
        h="70px"
      />

      <Box>
        <Tooltip isDisabled={false} hasArrow label={""}>
          <Box>
            <Button
              size="md"
              py="6"
              px="12"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleBurn}
            >
              Burn
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export { BurnItem };
