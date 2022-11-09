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
import { TransactionLink } from "components/common";

import { type IDataItem } from "components/five-stars/mint-section/section-data-utils";

interface IMintItem {
  item: IDataItem;
  disableButton?: boolean;
}

const MintItem: NextPage<IMintItem> = ({
  item: { amount, imageUrl, price },
  disableButton,
}) => {
  const { isAuthenticated, Moralis } = useMoralis();
  const { buyMetaborgStar, isLoading, isFetching } = useBuyMetaborgStars({
    salePrice: Moralis.Units.FromWei(price),
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
        title: (
          <TransactionLink
            text="Verifying transaction"
            transactionHash={transaction?.hash}
          />
        ),
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
        title: (
          <TransactionLink
            text="Transaction has been verified successfully"
            transactionHash={transaction?.hash}
          />
        ),
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
    <Flex
      my={[28, 14]}
      direction={["column", "row"]}
      alignItems="center"
      px={["initial", 20]}
    >
      <Box w={["initial", 1100]}>
        <Image src={imageUrl} alt="nft to mint" />
      </Box>

      <Box
        border="1px dotted"
        borderColor="brand.red"
        w={["1px", "100%"]}
        h={["120px", "1px"]}
      />

      <Box textAlign="left">
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
              <Text fontSize="lg">
                {amount} NFT{amount > 1 ? "S" : ""}
              </Text>
              {isAuthenticated && (
                <Text fontSize="sm">{Moralis.Units.FromWei(price)} ETH</Text>
              )}
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
