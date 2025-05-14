import axios from '../lib/axiosInstance';

/**
 * 대상 테이블의 미정산 영수증 ID를 조회하는 API
 */
export const getNonAdjustReceipt = async (tableId: number): Promise<string | null> => {
  try {
    const response = await axios.get<{ id: string | null }>(`/api/v1/table/${tableId}/receipts/non-adjust`);
    console.log('미정산 영수증 조회 성공:', response.data.id);
    return response.data.id;
  } catch (error) {
    console.error('미정산 영수증 조회 실패:', error);
    throw error;
  }
};

/**
 * 미정산 영수증이 없을 경우 새로운 영수증을 생성하는 API
 */
export const createReceipt = async (
  storeId: number,
  tableId: number
): Promise<{ id: string }> => {
  try {
    const response = await axios.post<{ id: string }>(
      `/api/v1/receipts?storeId=${storeId}&tableId=${tableId}`
    );
    console.log('영수증 생성 성공:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};