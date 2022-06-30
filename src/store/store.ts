import create from "zustand";

interface StateObject {
  distributionPrice: number | string;
  setDistributionPrice: (distributionPrice: number) => void;
}

export const useStore = create<StateObject>((set) => ({
  distributionPrice: "",
  setDistributionPrice: (distributionPrice) => {
    set(() => ({ distributionPrice }));
  },
}));
