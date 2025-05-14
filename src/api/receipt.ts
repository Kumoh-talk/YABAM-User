import axios from 'axios';

/**
 * 대상 테이블의 미정산 영수증 ID를 조회하는 API
 * @param tableId 테이블 ID
 * @returns 영수증 ID(string) 또는 null
 */
export const getNonAdjustReceipt = async (tableId: number): Promise<string | null> => {
  try {
    const response = await axios.get<{ id: string | null }>(`/api/v1/table/${tableId}/receipts/non-adjust`);
    return response.data.id;
  } catch (error) {
    console.error('미정산 영수증 조회 실패:', error);
    throw error;
  }
};

/**
 * 미정산 영수증이 없을 경우 새로운 영수증을 생성하는 API
 * @param storeId 가게 ID
 * @param tableId 테이블 ID
 * @returns 생성된 영수증 ID
 */
export const createReceipt = async (
  storeId: number,
  tableId: number
): Promise<{ id: string }> => {
  try {
    const response = await axios.post<{ id: string }>('/api/v1/receipts', {
      storeId,
      tableId,
    });
    return response.data;
  } catch (error) {
    console.error('영수증 생성 실패:', error);
    throw error;
  }
};