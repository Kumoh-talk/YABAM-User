import axios from "axios";
import type { ApiResponse } from "../types/ApiResponse";
import type { storeInfoDtos, StoreListResponse } from "../types/Store"; // 예시: 실제 응답 데이터 타입

export const getStoreList = async (
  lastStoreId: number | null,
  size: number
): Promise<storeInfoDtos[] | undefined> => {
  const response = await axios.get<ApiResponse<StoreListResponse>>(
    "/api/v1/stores",
    {
      params: {
        lastStoreId,
        size,
      },
    }
  );
  console.log(response);
  return response.data.data.storeInfoDtos;
};
