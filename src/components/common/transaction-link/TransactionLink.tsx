import { FC } from "react";
import { Text, Link } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import NextLink from "next/link";

import { getTransactionLink } from "utils/transactionLink";

interface ITransactionLinkProps {
  text: string;
  transactionHash: string;
}

const TransactionLink: FC<ITransactionLinkProps> = ({
  text,
  transactionHash,
}) => {
  const { chainId } = useMoralis();
  const transactionLink = getTransactionLink(transactionHash, chainId);

  return (
    <Text>
      {text} <br />
      <NextLink href={transactionLink} passHref>
        <Link target="_blank" color="brand.white">
          {transactionLink.substring(0, 38)}...
        </Link>
      </NextLink>
    </Text>
  );
};

export { TransactionLink };
