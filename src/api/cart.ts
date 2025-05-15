import axiosInstance from "../lib/axiosInstance";

/**
 * 장바구니에 상품 추가/수정 API
 * @param receiptId - 영수증 ID
 * @param menuId - 메뉴 ID
 * @param quantity - 수량
 */
export const addOrUpdateCartItem = async (
  receiptId: string,
  menuId: number,
  quantity: number
): Promise<void> => {
  await axiosInstance.post("api/v1/cart", null, {
    params: {
      receiptId,
      menuId,
      quantity,
    },
  });
};