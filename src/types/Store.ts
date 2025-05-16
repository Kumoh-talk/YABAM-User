export type StoreListResponse = {
  totalCount: number;
  hasNextPage: boolean;
  lastStoreId: number;
  storeInfoDtos: storeInfoDtos[];
};

export type storeInfoDtos = {
  storeId: number;
  storeName: string;
  isOpened: boolean;
  headImageUrl: string;
  description: string;
  storeDetailImageUrls?: string[];
};

export type StoreResponse = {
  storeId: number;
  isOpen: boolean;
  storeName: string;
  latitude: number;
  longitude: number;
  description: string;
  headImageUrl: string;
  university: string;
  tableTime: number;
  tableCost: number;
  detailImageUrls: string[];
};
