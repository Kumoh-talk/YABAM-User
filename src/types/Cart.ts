export type CartMenuDto = {
  quantity: number;
  menuId: number;
  order: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isSoldOut: boolean;
  isRecommended: boolean;
};

export type CartResponse = {
  receiptId: string;
  cartMenuDtos: CartMenuDto[];
};