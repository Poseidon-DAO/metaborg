interface DistributionMetaData {
  originalData: {
    price: string;
    diamondSupply: string;
    goldSupply: string;
    originlSupply: string;
  };
  formatedData: {
    price: number;
    diamondSupply: number;
    goldSupply: number;
    originlSupply: number;
  };
}

export type { DistributionMetaData };
