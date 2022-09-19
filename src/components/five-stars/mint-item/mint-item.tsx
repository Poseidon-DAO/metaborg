import { useState } from "react";
import { NextPage } from "next";
import { useMoralis } from "react-moralis";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useBuyMetaborgStars } from "lib/hooks/five-stars";
import { getDefaultToastConfig } from "utils/toast";

interface IMintItem {
  id: string;
  amount: number;
  imageUrl: string;
  price: string;
}

const MintItem: NextPage<IMintItem> = ({ amount, imageUrl, price }) => {
  const { isAuthenticated } = useMoralis();
  const { buyMetaborgStar, isLoading, isFetching } = useBuyMetaborgStars({
    salePrice: price,
  });
  const [isVerifing, setVerifing] = useState(false);
  const toast = useToast();

  async function handleTransactionSuccess(transaction: any) {
    toast(
      getDefaultToastConfig({
        title: "Verifying Transaction...",
        status: "info",
        duration: null,
      })
    );
    setVerifing(true);
    await transaction.wait();
    toast.closeAll();
    setVerifing(false);
    toast(
      getDefaultToastConfig({
        title: "Transaction has been verified successfully",
        status: "success",
      })
    );
  }

  function handleTransactionError(error: Error) {
    toast.closeAll();
    console.error(error);
    toast(
      getDefaultToastConfig({
        title: error?.message || "There was a problem minting your NFT!",
        status: "error",
      })
    );
  }

  function handleMintClick() {
    buyMetaborgStar({
      onSuccess: handleTransactionSuccess,
      onError: handleTransactionError,
    });
  }

  return (
    <Flex my={14} justifyContent="space-between" alignItems="center">
      <Box w={800}>
        <Image src={imageUrl} alt="nft to mint" />
      </Box>

      <Box border="1px dotted" borderColor="brand.red" w="100%" h="1px" />

      <Box textAlign="right">
        <Tooltip
          isDisabled={isAuthenticated}
          hasArrow
          label="Please connect Metamask to mint!"
        >
          <div>
            <Button
              minW="240px"
              size="xl"
              flexDir="column"
              onClick={handleMintClick}
              isLoading={isLoading || isFetching || isVerifing}
              disabled={
                !isAuthenticated || isLoading || isFetching || isVerifing
              }
            >
              <Heading color="brand.red">MINT</Heading>
              <Text>
                {amount} NFT{amount > 1 ? "S" : ""}
              </Text>
            </Button>
          </div>
        </Tooltip>
      </Box>
    </Flex>
  );
};

export { MintItem };
