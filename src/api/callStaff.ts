import axiosInstance from "../lib/axiosInstance";

/**
 * 직원 호출 요청 API
 * @param receiptId - 영수증 ID
 * @param callMessage - 호출 메시지
 */
export const callStaff = async (receiptId: string, callMessage: string): Promise<void> => {
  await axiosInstance.post("/api/v1/call", {
    receiptId,
    callMessage,
  });
};