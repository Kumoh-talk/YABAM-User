import axiosInstance from '../lib/axiosInstance';
import type { ApiResponse } from '../types/ApiResponse';
import type { ReceiptIdData } from '../types/Receipt';
import type { ReceiptAndOrdersResponse } from '../types/Receipt';

/**
 * 미정산 영수증이 없을 경우 새로운 영수증을 생성하는 API
 */
export const createReceipt = async (
  storeId: number,
  tableId: string
): Promise<{ id: string }> => {
  const response = await axiosInstance.post<{ id: string }>(
    `/api/v1/receipts?storeId=${storeId}&tableId=${tableId}`
  );
  return response.data;
};

/**
 * 대상 테이블의 미정산 영수증 ID를 조회하는 API
 */
export const getNonAdjustReceipt = async (tableId: string): Promise<string | null> => {
  const response = await axiosInstance.get<ApiResponse<ReceiptIdData>>(
    `/api/v1/table/${tableId}/receipts/non-adjust`
  );
  return response.data?.data?.receiptId ?? null;
};

/**
 * 영수증 세부정보 조회 API
 * @param receiptId - 영수증 ID
 * @returns 영수증 및 주문 리스트 데이터
 */
export const getReceiptDetails = async (
  receiptId: string
): Promise<ReceiptAndOrdersResponse> => {
  const response = await axiosInstance.get<ApiResponse<ReceiptAndOrdersResponse>>(
    `/api/v1/receipts/${receiptId}`
  );
  return response.data.data;
};