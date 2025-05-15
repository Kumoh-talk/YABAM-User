import axiosInstance from "../lib/axiosInstance";
import type { CartResponse } from "../types/Cart";

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
  await axiosInstance.post("/api/v1/cart", null, {
    params: {
      receiptId,
      menuId,
      quantity,
    },
  });
};

/**
 * 장바구니 조회 API
 * @param receiptId - 영수증 ID
 * @returns 장바구니 데이터
 */
export const getCartItems = async (receiptId: string): Promise<CartResponse> => {
  const response = await axiosInstance.get("/api/v1/cart", {
    params: { receiptId },
  });
  return response.data.data;
};

/**
 * 장바구니에서 특정 메뉴 삭제 API
 * @param receiptId - 영수증 ID
 * @param menuId - 메뉴 ID
 */
export const deleteCartItem = async (receiptId: string, menuId: number): Promise<void> => {
  await axiosInstance.delete("/api/v1/cart/menu", {
    params: {
      receiptId,
      menuId,
    },
  });
};