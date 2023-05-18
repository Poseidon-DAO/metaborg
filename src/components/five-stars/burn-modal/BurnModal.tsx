import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
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
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useBurn, useBurnDataSubmit } from "lib/hooks/five-stars";
import { getDefaultToastConfig } from "utils/toast";
import { TransactionLink } from "components/common";
import { useNfts } from "lib/hooks/common";
import { useBurnDataFromStorage } from "store/store";

import countires from "../../../countries";

interface IProps {
  isOpen?: boolean;
  onClose: () => void;
  tokenId: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  confirmationEmail: string;
  city: string;
  country: string;
  address: string;
  state: string;
  zip: string;
}

const initialValues = {
  name: "",
  phone: "",
  email: "",
  confirmationEmail: "",
  city: "",
  country: "",
  address: "",
  state: "",
  zip: "",
};

const BurnModal: NextPage<IProps> = ({ isOpen = false, tokenId, onClose }) => {
  const userDataOnStorage = useBurnDataFromStorage(
    (state) => state.userBurnData
  );
  const setUserDataOnStorage = useBurnDataFromStorage(
    (state) => state.setUserBurnData
  );

  const toast = useToast();
  const { refetch } = useNfts();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resetOptions: {
      keepDefaultValues: false,
    },
    values: userDataOnStorage || initialValues,
    defaultValues: userDataOnStorage || initialValues,
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [rememberUser, setRememberUser] = useState(
    !!isDirty || !!userDataOnStorage
  );

  watch("name");
  watch("phone");
  watch("email");
  watch("confirmationEmail");
  watch("country");
  watch("address");
  watch("city");
  watch("state");
  watch("zip");

  const { name, phone, email, city, country, address, state, zip } =
    getValues();

  const { burn, burnData, burnStatus } = useBurn({
    args: { email, tokenId },
  });
  const { status } = useBurnDataSubmit({
    data: {
      name,
      phone,
      email,
      country,
      address,
      state,
      city,
      zip,
      tokenId,
    },
    enabled: burnStatus === "success",
  });

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
      if (!rememberUser) {
        setUserDataOnStorage(null);
      }
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

  function handleClose() {
    setShowFormModal(false);
    reset();
    onClose();
  }

  function handleNextStep() {
    setShowFormModal(true);
  }

  function handleRememberMeClick(event: ChangeEvent<HTMLInputElement>) {
    setRememberUser(event.target.checked);
  }

  function handleClearClick() {
    reset();
    setUserDataOnStorage(null);
  }

  function onSubmit(data: FormData) {
    if (rememberUser) {
      setUserDataOnStorage(data);
    }
    burn?.();
  }

  const isSubmitting = burnStatus === "loading" || status === "loading";

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Burn your NFT</ModalHeader>
        <ModalCloseButton />
        {showFormModal ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Stack spacing={3}>
                  <FormControl
                    isInvalid={!!errors?.name}
                    isDisabled={isSubmitting}
                  >
                    <FormLabel htmlFor="name">
                      Full name (name + surname)
                    </FormLabel>
                    <Input
                      placeholder="John Doe"
                      errorBorderColor="crimson"
                      {...register("name", {
                        required: "Full name is required",
                      })}
                    />

                    <FormHelperText color="crimson">
                      {errors?.name && errors.name.message}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors?.phone}
                    isDisabled={isSubmitting}
                  >
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      placeholder="+41 xx xxx xx xx"
                      errorBorderColor="crimson"
                      type="tel"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value:
                            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                          message: "Wrong phone format!",
                        },
                      })}
                    />
                    <FormHelperText color="crimson">
                      {errors?.phone && errors.phone.message}
                    </FormHelperText>
                  </FormControl>

                  <Flex gap={2}>
                    <FormControl
                      isInvalid={!!errors?.email}
                      isDisabled={isSubmitting}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="john@doe.com"
                        errorBorderColor="crimson"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Wrong email format!",
                          },
                        })}
                      />
                      <FormHelperText color="crimson">
                        {errors?.email && errors.email.message}
                      </FormHelperText>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors?.confirmationEmail}
                      isDisabled={isSubmitting}
                    >
                      <FormLabel htmlFor="confirmationEmail">
                        Confirm email
                      </FormLabel>
                      <Input
                        placeholder="john@doe.com"
                        errorBorderColor="crimson"
                        {...register("confirmationEmail", {
                          required: "Confirm your email!",
                          validate: {
                            isEmailConfirmed: (confirmEmail) =>
                              confirmEmail.toLowerCase() ===
                                email.toLowerCase() ||
                              "Confirmation email does not match",
                          },
                        })}
                      />
                      <FormHelperText color="crimson">
                        {errors.confirmationEmail &&
                          errors.confirmationEmail.message}
                      </FormHelperText>
                    </FormControl>
                  </Flex>

                  <Flex gap={2}>
                    <FormControl
                      isInvalid={!!errors?.address}
                      isDisabled={isSubmitting}
                    >
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <Input
                        placeholder="Address"
                        errorBorderColor="crimson"
                        {...register("address", {
                          required: "Address is required",
                        })}
                      />
                      <FormHelperText color="crimson">
                        {errors.address && errors.address.message}
                      </FormHelperText>
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors?.city}
                      isDisabled={isSubmitting}
                    >
                      <FormLabel htmlFor="city">City</FormLabel>
                      <Input
                        placeholder="City"
                        errorBorderColor="crimson"
                        {...register("city", {
                          required: "City is required",
                        })}
                      />
                      <FormHelperText color="crimson">
                        {errors.city && errors.city.message}
                      </FormHelperText>
                    </FormControl>
                  </Flex>

                  <FormControl
                    isInvalid={!!errors?.country}
                    isDisabled={isSubmitting}
                  >
                    <FormLabel htmlFor="country">Country</FormLabel>

                    <Select
                      placeholder="Select country"
                      errorBorderColor="crimson"
                      {...register("country", {
                        required: "Country is required",
                      })}
                    >
                      {countires.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </Select>
                    <FormHelperText color="crimson">
                      {errors.country && errors.country.message}
                    </FormHelperText>
                  </FormControl>

                  <Flex gap={2}>
                    <FormControl
                      isInvalid={!!errors?.state}
                      isDisabled={isSubmitting}
                    >
                      <FormLabel htmlFor="state">State</FormLabel>
                      <Input
                        placeholder="State"
                        errorBorderColor="crimson"
                        {...register("state", {
                          required: "State is required",
                        })}
                      />
                      <FormHelperText color="crimson">
                        {errors.state && errors.state.message}
                      </FormHelperText>
                    </FormControl>

                    <FormControl
                      w="40%"
                      isInvalid={!!errors?.zip}
                      isDisabled={isSubmitting}
                    >
                      <FormLabel htmlFor="zip">Zip code</FormLabel>
                      <Input
                        placeholder="Zip code"
                        errorBorderColor="crimson"
                        {...register("zip", {
                          required: "Zip code is required",
                        })}
                      />
                      <FormHelperText color="crimson">
                        {errors.zip && errors.zip.message}
                      </FormHelperText>
                    </FormControl>
                  </Flex>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  w="full"
                >
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    isChecked={rememberUser}
                    onChange={handleRememberMeClick}
                    isDisabled={isSubmitting}
                  >
                    Remember me
                  </Checkbox>

                  <Flex>
                    {(isDirty || userDataOnStorage) && (
                      <Button
                        size="md"
                        variant="ghost"
                        borderRadius="0"
                        mx="2"
                        disabled={isSubmitting}
                        onClick={handleClearClick}
                      >
                        Clear
                      </Button>
                    )}

                    <Button
                      size="md"
                      variant="solid"
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Burn
                    </Button>
                  </Flex>
                </Flex>
              </ModalFooter>
            </form>
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
