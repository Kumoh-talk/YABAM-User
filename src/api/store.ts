import axios from "../lib/axiosInstance";
import type { ApiResponse } from "../types/ApiResponse";
import type { StoreListResponse } from "../types/Store";

export const getStoreList = async (
  lastStoreId: number | null,
  size: number
): Promise<StoreListResponse> => {
  const response = await axios.get<ApiResponse<StoreListResponse>>(
    "/api/v1/stores",
    {
      params: {
        lastStoreId,
        size,
      },
    }
  );

  console.log(response.data.data); // 응답 확인
  return response.data.data; // StoreListResponse 전체 반환
};