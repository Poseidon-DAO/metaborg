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
  item: {
    id: string;
    amount: number;
    imageUrl: string;
    price: string;
  };
  disableButton?: boolean;
}

const MintItem: NextPage<IMintItem> = ({
  item: { amount, imageUrl, price },
  disableButton,
}) => {
  const { isAuthenticated, isWeb3Enabled } = useMoralis();
  const { buyMetaborgStar, data, isLoading, isFetching } = useBuyMetaborgStars({
    salePrice: price,
  });
  const [isVerifing, setVerifing] = useState(false);
  const toast = useToast();

  function getToolTipMessage() {
    const key = !isAuthenticated
      ? "auth"
      : disableButton
      ? "sufficentPages"
      : "";

    return {
      auth: "Please connect Metamask to mint!",
      sufficentPages: "No more pages available!",
    }[key as string];
  }

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

  const isButtonDisabled =
    disableButton || !isAuthenticated || isLoading || isFetching || isVerifing;
  const isButtonLoading = isLoading || isFetching || isVerifing;
  const isTooltipDisabled = (isAuthenticated && !disableButton) || false;

  return (
    <Flex my={14} justifyContent="space-between" alignItems="center">
      <Box w={800}>
        <Image src={imageUrl} alt="nft to mint" />
      </Box>

      <Box border="1px dotted" borderColor="brand.red" w="100%" h="1px" />

      <Box textAlign="right">
        <Tooltip
          isDisabled={isTooltipDisabled}
          hasArrow
          label={getToolTipMessage()}
        >
          <div>
            <Button
              minW="240px"
              size="xl"
              flexDir="column"
              onClick={handleMintClick}
              isLoading={isButtonLoading}
              disabled={isButtonDisabled}
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

MintItem.defaultProps = {
  disableButton: false,
};

export { MintItem };
