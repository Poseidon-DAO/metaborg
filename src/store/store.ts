import create from "zustand";

import type { DistributionMetaData } from "./types";

interface StateObject {
  token: string;
  setToken: (token: string) => void;
  distributionMetaData: DistributionMetaData;
  setDistributionMetaData: (distributionMetaData: DistributionMetaData) => void;
}

export const useStore = create<StateObject>((set) => ({
  token: "",
  setToken: (token) => set(() => ({ token })),
  distributionMetaData: {
    formatedData: {
      price: 0,
      diamondSupply: 0,
      goldSupply: 0,
      originlSupply: 0,
    },
    originalData: {
      price: "",
      diamondSupply: "",
      goldSupply: "",
      originlSupply: "",
    },
  },
  setDistributionMetaData: (distributionMetaData) =>
    set(() => ({ distributionMetaData })),
}));
