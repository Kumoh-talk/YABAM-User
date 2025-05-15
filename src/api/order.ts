import axiosInstance from "../lib/axiosInstance";

/**
 * 장바구니 기반 주문 생성 API
 * @param receiptId - 영수증 ID
 */
export const createOrderWithCart = async (receiptId: string): Promise<void> => {
  await axiosInstance.post(`/api/v1/receipts/${receiptId}/orders/with-cart`);
};