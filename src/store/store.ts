import create from "zustand";
import { persist } from "zustand/middleware";

interface StateObject {
  userBurnData: {
    name: string;
    phone: string;
    email: string;
    confirmationEmail: string;
    address: string;
    state: string;
    zip: string;
  } | null;
  setUserBurnData: (burnData: StateObject["userBurnData"]) => void;
}

export const useBurnDataFromStorage = create<StateObject>()(
  persist(
    (set) => ({
      userBurnData: null,
      setUserBurnData: (burnData: StateObject["userBurnData"]) =>
        set(() => ({ userBurnData: burnData })),
    }),
    {
      name: "burn-user-data-storage",
    }
  )
);
