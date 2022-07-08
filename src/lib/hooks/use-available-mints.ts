import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";
import { useEffect, useState } from "react";

interface IUseAvailableMintsProps {
  deps?: any[];
  enabled?: boolean;
  _mangaDistributionID?: number | string;
  _address?: string;
  promiseAll?: boolean;
}

function useAvailableMints({
  deps = undefined,
  enabled = true,
  _mangaDistributionID = "",
  _address = "",
  promiseAll = false,
}: IUseAvailableMintsProps = {}) {
  const { user } = useMoralis();
  const [mintsObj, setMintsObj] = useState<Record<string, number>>({});
  const [allAvailableMints, setAllAvailableMints] = useState<string | number>(
    ""
  );

  const options = {
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS,
    functionName: "getAvailableMints",
    params: {
      _mangaDistributionID: _mangaDistributionID,
      _address: _address || user?.get("ethAddress"),
    },
  };

  const { fetch, data, isFetching, isLoading, error } =
    useWeb3ExecuteFunction(options);

  const dependencies = [...(deps || []), enabled];

  async function fetchAll() {
    if (!enabled) return;

    const ids = Array.from({ length: +_mangaDistributionID }, (_, i) => i + 1);
    const promises = ids.map((id) => {
      let updatedOptions = {
        ...options,
        params: { ...options.params, _mangaDistributionID: +id },
      };

      return fetch({ params: updatedOptions });
    });

    return Promise.allSettled(promises);
  }

  useEffect(() => {
    if (!enabled) return;

    if (!promiseAll) {
      fetch();
    } else {
      fetchAll().then((data) => {
        data?.forEach((mints: any, index) => {
          setMintsObj((prev) => ({
            ...prev,
            [index + 1]: Number(mints?.value),
          }));
          setAllAvailableMints((prevState) => {
            return Number(prevState) + Number(mints?.value);
          });
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    fetch,
    fetchAll,
    mintsObj,
    availableMints: data ? Number((data as object).toString()) : "",
    allAvailableMints: promiseAll ? allAvailableMints : null,
    isFetching,
    isLoading,
    error,
  };
}

export { useAvailableMints };
