export type MenuCategory = {
  menuCategoryId: number;
  menuCategoryName: string;
  menuCategoryOrder: number;
};

export type MenuInfoResponse = {
  menuId: number;
  menuOrder: number;
  menuName: string;
  menuPrice: number;
  menuDescription: string;
  menuImageUrl: string;
  menuIsSoldOut: boolean;
  menuIsRecommended: boolean;
};