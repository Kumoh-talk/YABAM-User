import style from "./OrderMenu.module.css";
import MenuItem from "../../components/MenuItem/MenuItem";
import Tag from "../../components/Tag/Tag";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMenuCategories, getMenusByCategory } from "../../api/menu";
import type { MenuCategory, MenuInfoResponse } from "../../types/Menu";

const OrderMenu = () => {
  const [searchParams] = useSearchParams();
  const storeId = Number(searchParams.get("storeId"));
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
        console.error("메뉴 데이터 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [storeId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <header>
        <div className={style.top}>
          <p className={style.headerTitle}>메뉴 주문하기</p>
        </div>
        <div className={style.bottom}>
          {categories.map((category) => (
            <Tag key={category.menuCategoryId} content={category.menuCategoryName} />
          ))}
        </div>
      </header>
      <main>
        {categories.map((category) => (
          <div key={category.menuCategoryId} className={style.menuCategory}>
            <h3>{category.menuCategoryName}</h3>
            <div className={style.menuItems}>
              {menus[category.menuCategoryId]?.map((menu) => (
                <MenuItem key={menu.menuId} menu={menu} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default OrderMenu;