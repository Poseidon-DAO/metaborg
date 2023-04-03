import { NextPage } from "next";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useBurn, useBurnDataSubmit } from "lib/hooks/five-stars";
import { validateEmail } from "utils/email";
import { getDefaultToastConfig } from "utils/toast";
import { TransactionLink } from "components/common";
import { useNfts } from "lib/hooks/common";

interface IProps {
  isOpen?: boolean;
  onClose: () => void;
  tokenId: string;
}

const initialErrors = {
  name: "",
  email: "",
  address: "",
};

const BurnModal: NextPage<IProps> = ({ isOpen = false, tokenId, onClose }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const toast = useToast();
  const { refetch } = useNfts();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const { burn, burnData, burnStatus, isBurnSuccess } = useBurn({
    args: { email, tokenId },
  });
  const { status } = useBurnDataSubmit({
    data: {
      name,
      email,
      address,
      tokenId,
    },
    enabled: burnStatus === "success",
  });

  const [errors, setErrors] = useState(initialErrors);

  console.log({ burnStatus, isBurnSuccess });

  useEffect(() => {
    if (burnStatus === "success" && status === "success") {
      refetch();
      toast(
        getDefaultToastConfig({
          title: (
            <TransactionLink
              text="Transaction has been verified successfully"
              transactionHash={burnData?.hash as string}
            />
          ),
          status: "success",
        })
      );
      onClose();
    }

    if (burnStatus === "error" || status === "error") {
      toast(
        getDefaultToastConfig({
          title: (
            <TransactionLink text="Transaction failed" transactionHash="" />
          ),
          status: "error",
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burnStatus, status]);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<string>>
  ) {
    if (!isValid()) {
      setErrors(initialErrors);
    }
    setter(event.target.value);
  }

  function isValid() {
    if (!name) {
      setErrors({
        ...initialErrors,
        name: "Name is required!",
      });
      return false;
    }

    if (!email || !validateEmail(email)) {
      setErrors({
        ...initialErrors,
        email: !!email ? "Wrong email format!" : "Email is required!",
      });
      return false;
    }

    if (!address) {
      setErrors({
        ...initialErrors,
        address: "Address is required!",
      });
      return false;
    }

    return true;
  }

  function handleClose() {
    setName("");
    setEmail("");
    setAddress("");
    setErrors(initialErrors);
    setShowFormModal(false);
    onClose();
  }

  function handleNextStep() {
    setShowFormModal(true);
  }

  function handleSubmit() {
    if (!isValid()) return;

    burn?.();
  }

  return (
    <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Burn your NFT</ModalHeader>
        <ModalCloseButton />
        {showFormModal ? (
          <>
            <ModalBody>
              <Stack spacing={3}>
                <FormControl>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    placeholder="Full name"
                    value={name}
                    onChange={(event) => handleInputChange(event, setName)}
                    errorBorderColor="crimson"
                    isInvalid={!!errors.name}
                  />
                  <FormHelperText
                    visibility={!!errors.name ? "visible" : "hidden"}
                    color="crimson"
                  >
                    {errors.name}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(event) => handleInputChange(event, setEmail)}
                    errorBorderColor="crimson"
                    isInvalid={!!errors.email}
                  />
                  <FormHelperText
                    visibility={!!errors.email ? "visible" : "hidden"}
                    color="crimson"
                  >
                    {errors.email}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    placeholder="Address"
                    value={address}
                    onChange={(event) => handleInputChange(event, setAddress)}
                    errorBorderColor="crimson"
                    isInvalid={!!errors.address}
                  />
                  <FormHelperText
                    visibility={!!errors.address ? "visible" : "hidden"}
                    color="crimson"
                  >
                    {errors.address}
                  </FormHelperText>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                size="md"
                variant="solid"
                onClick={handleSubmit}
                isLoading={burnStatus === "loading" || status === "loading"}
                disabled={burnStatus === "loading" || status === "loading"}
              >
                Burn
              </Button>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalBody>
              <Heading size="sm">
                Are you sure you want to burn your NFT?
              </Heading>
            </ModalBody>

            <ModalFooter>
              <Button size="md" variant="solid" onClick={handleNextStep}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export { BurnModal };
