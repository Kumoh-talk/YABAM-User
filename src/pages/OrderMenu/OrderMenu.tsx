import style from "./OrderMenu.module.css";
import { IoCloseOutline } from "react-icons/io5";
import MenuItem from "../../components/MenuItem/MenuItem";
import Tag from "../../components/Tag/Tag";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMenuCategories, getMenusByCategory } from "../../api/menu";
import type { MenuCategory, MenuInfoResponse } from "../../types/Menu";
import { toast } from "react-toastify";
import CallStaffModal from "../../components/CallStaffModal/CallStaffModal";

const OrderMenu = () => {
  const [searchParams] = useSearchParams();
  const storeId = Number(searchParams.get("storeId"));
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menus, setMenus] = useState<Record<number, MenuInfoResponse[]>>({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // 직원 호출 모달 열기/닫기
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // 메뉴 데이터 가져오기
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
        toast.error("메뉴 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
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
    <>
      {modalOpen && <CallStaffModal closeModal={closeModal} />}
      <div>
        <header>
          <div className={style.top}>
            <IoCloseOutline />
            <p className={style.headerTitle}>메뉴 주문하기</p>
            <button className={style.call} onClick={openModal}>
              직원호출
            </button>
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
    </>
  );
};

export default OrderMenu;