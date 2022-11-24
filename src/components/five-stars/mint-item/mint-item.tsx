import { useEffect } from "react";
import { NextPage } from "next";
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
import { useAccount } from "wagmi";
import { ethers } from "ethers";

interface IMintItem {
  item: IDataItem;
  disableButton?: boolean;
  label?: string;
}

const MintItem: NextPage<IMintItem> = ({
  item: { amount, imageUrl, price },
  disableButton,
  label,
}) => {
  const toast = useToast();
  const { isConnected } = useAccount();

  const { buy, buyData, isBuying, isBuyFetching, isBuyingSuccess, error } =
    useBuyMetaborgStars({
      args: { salePrice: ethers.utils.formatEther(price) },
    });

  useEffect(() => {
    if (isBuyingSuccess) {
      toast(
        getDefaultToastConfig({
          title: (
            <TransactionLink
              text="Transaction has been verified successfully"
              transactionHash={buyData?.hash as string}
            />
          ),
          status: "success",
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuyingSuccess, buyData?.hash]);

  useEffect(() => {
    if (isBuying) {
      toast(
        getDefaultToastConfig({
          title: (
            <TransactionLink
              text="Verifying transaction"
              transactionHash={buyData?.hash as string}
            />
          ),
          status: "info",
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuying, buyData?.hash]);

  useEffect(() => {
    if (error) {
      toast(
        getDefaultToastConfig({
          title: error?.message || "There was a problem minting your NFT!",
          status: "error",
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!error]);

  function handleMintClick() {
    buy?.();
  }

  const isButtonDisabled =
    disableButton || !isConnected || isBuying || isBuyFetching;
  const isButtonLoading = isBuying || isBuyFetching;
  const isTooltipDisabled = (isConnected && !disableButton) || false;

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
        <Tooltip isDisabled={isTooltipDisabled} hasArrow label={label}>
          <Box>
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
              {isConnected && (
                <Text fontSize="sm">{ethers.utils.formatUnits(price)} ETH</Text>
              )}
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Flex>
  );
};

MintItem.defaultProps = {
  disableButton: false,
};

export { MintItem };
