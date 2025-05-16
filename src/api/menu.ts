import axiosInstance from '../lib/axiosInstance';
import type { ApiResponse } from '../types/ApiResponse';
import type { MenuCategory, MenuInfoResponse } from '../types/Menu';

/*
  * 메뉴 카테고리 조회
  * @param storeId - 매장 ID
  * @returns {Promise<MenuCategory[]>} - 메뉴 카테고리 목록
*/
export const getMenuCategories = async (storeId: number): Promise<MenuCategory[]> => {
  const response = await axiosInstance.get<ApiResponse<MenuCategory[]>>(
    `/api/v1/stores/${storeId}/menu-categories`
  );
  return response.data.data;
};

/*
  * 카테고리별 메뉴 조회
  * @param storeId - 매장 ID
  * @param menuCategoryId - 메뉴 카테고리 ID
  * @returns {Promise<MenuInfoResponse[]>} - 메뉴 정보 목록
*/
export const getMenusByCategory = async (
  storeId: number,
  menuCategoryId: number
): Promise<MenuInfoResponse[]> => {
  const response = await axiosInstance.get<ApiResponse<MenuInfoResponse[]>>(
    `/api/v1/stores/${storeId}/menu-category/${menuCategoryId}/menus`
  );
  return response.data.data;
};