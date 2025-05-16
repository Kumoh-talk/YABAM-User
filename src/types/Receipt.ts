import type { MenuInfoResponse } from "./Menu";

export type ReceiptIdData = {
  receiptId: string;
};

export type ReceiptAndOrdersResponse = {
  receiptInfo: ReceiptInfoResponse;
  orderAndMenusResponses: OrderAndMenusResponse[];
};

export type ReceiptInfoResponse = {
  receiptId: string;
  receiptStatus: string;
  totalPrice: number;
};

export type OrderAndMenusResponse = {
  orderId: number;
  orderStatus: "ORDERED" | "RECEIVED" | "CANCELED" | "COMPLETED";
  totalPrice: number;
  orderMenus: OrderMenuResponse[];
};

export type OrderMenuResponse = {
  orderMenuId: number;
  orderMenuStatus: "ORDERED" | "COOKING" | "CANCELED" | "COMPLETED";
  quantity: number;
  menuInfo: MenuInfoResponse;
};