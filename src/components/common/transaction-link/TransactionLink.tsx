import { FC } from "react";
import { Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { getTransactionLink } from "utils/transactionLink";
import { useNetwork } from "wagmi";

interface ITransactionLinkProps {
  text: string;
  transactionHash: string;
}

const TransactionLink: FC<ITransactionLinkProps> = ({
  text,
  transactionHash,
}) => {
  const { chain } = useNetwork();
  const transactionLink = getTransactionLink(transactionHash, `${chain?.id}`);

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
