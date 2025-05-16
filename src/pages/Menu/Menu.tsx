import { useEffect, useState } from "react";
import type { MenuCategory, MenuInfoResponse } from "../../types/Menu";
import MenuList from "../../components/MenuList/MenuList";
import { getMenuCategories, getMenusByCategory } from "../../api/menu";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

type menuType = {
  storeId: number;
  onMenuClick?: (menu: MenuInfoResponse) => void;
};

const Menu = ({ storeId, onMenuClick }: menuType) => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menus, setMenus] = useState<Record<number, MenuInfoResponse[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const categoriesData = await getMenuCategories(storeId);
        setCategories(categoriesData);

        const menusData: Record<number, MenuInfoResponse[]> = {};
        for (const category of categoriesData) {
          menusData[category.menuCategoryId] = await getMenusByCategory(
            storeId,
            category.menuCategoryId
          );
        }
        setMenus(menusData);
      } catch (error) {
        toast.error(
          "메뉴 데이터를 불러오는데 실패했습니다. 다시 시도해주세요."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [storeId]);

  if (loading) {
    return (
      <>
        <Loading msg="로딩중..." />;
      </>
    );
  }

  return (
    <>
      {categories?.map((category) => (
        <MenuList
          key={category.menuCategoryId}
          menus={menus}
          category={category}
          onMenuClick={onMenuClick}
        />
      ))}
    </>
  );
};

export default Menu;
