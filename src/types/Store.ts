export type StoreListResponse = {
  totalCount: number;
  hasNextPage: boolean;
  lastStoreId: number;
  storeInfoDtos?: storeInfoDtos[];
};

export type storeInfoDtos = {
  storeId: number;
  storeName: string;
  isOpened: boolean;
  headImageUrl: string;
  description: string;
  storeDetailImageUrls?: string[];
};
