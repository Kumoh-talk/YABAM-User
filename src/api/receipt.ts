import axios from '../lib/axiosInstance';
import type { ApiResponse } from '../types/ApiResponse';
import type { ReceiptIdData } from '../types/Receipt';

/**
 * 대상 테이블의 미정산 영수증 ID를 조회하는 API
 */
export const getNonAdjustReceipt = async (tableId: number): Promise<string | null> => {
  const response = await axios.get<ApiResponse<ReceiptIdData>>(
    `/api/v1/table/${tableId}/receipts/non-adjust`
  );
  return response.data?.data?.receiptId ?? null;
};

/**
 * 미정산 영수증이 없을 경우 새로운 영수증을 생성하는 API
 */
export const createReceipt = async (
  storeId: number,
  tableId: number
): Promise<{ id: string }> => {
  const response = await axios.post<{ id: string }>(
    `/api/v1/receipts?storeId=${storeId}&tableId=${tableId}`
  );
  return response.data;
};