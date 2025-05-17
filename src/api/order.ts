import axiosInstance from "../lib/axiosInstance";

/**
 * 장바구니 기반 주문 생성 API
 * @param receiptId - 영수증 ID
 */
export const createOrderWithCart = async (receiptId: string): Promise<void> => {
  await axiosInstance.post(`/api/v1/receipts/${receiptId}/orders/with-cart`);
};

/**
 * 주문 메뉴 상태 변경 API
 * @param orderMenuId - 주문 메뉴 ID
 * @param orderMenuStatus - 변경할 주문 메뉴 상태 (COOKING, CANCELED, COMPLETED)
 */
export const updateOrderMenuStatus = async (
  orderMenuId: number,
  orderMenuStatus: "COOKING" | "CANCELED" | "COMPLETED"
): Promise<void> => {
  await axiosInstance.patch(`/api/v1/order-menus/${orderMenuId}/status`, null, {
    params: { orderMenuStatus },
  });
};