import create from "zustand";

interface StateObject {
  distributionPrice: number;
  setDistributionPrice: (distributionPrice: number) => void;
}

export const useStore = create<StateObject>((set) => ({
  distributionPrice: 0,
  setDistributionPrice: (distributionPrice) => {
    set(() => ({ distributionPrice }));
  },
}));
