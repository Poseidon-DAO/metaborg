import { UseContractReadConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractRead";

export type ICustomHookBaseProps = UseContractReadConfig & {
  args?: any | any[];
};
