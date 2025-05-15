import style from "./OrderMenu.module.css";
import { BsCartFill } from "react-icons/bs";
import MenuItem from "../../components/MenuItem/MenuItem";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getMenuCategories, getMenusByCategory } from "../../api/menu";
import type { MenuCategory, MenuInfoResponse } from "../../types/Menu";
import { toast } from "react-toastify";
import CallStaffModal from "../../components/CallStaffModal/CallStaffModal";

const OrderMenu = () => {
  const [searchParams] = useSearchParams();
  const storeId = Number(searchParams.get("storeId"));
  const receiptId = searchParams.get("receiptId");
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menus, setMenus] = useState<Record<number, MenuInfoResponse[]>>({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

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

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu: MenuInfoResponse) => {
    if (menu.menuIsSoldOut) {
      toast.error("품절된 메뉴는 선택할 수 없습니다.");
      return;
    }
    navigate("/orderMenuDetail", { state: { menu, receiptId } });
  };

  return (
    <>
      {modalOpen && <CallStaffModal closeModal={closeModal} />}
      <div>
        <header>
          <div className={style.top}>
            <button
              className={style.orderStatus}
              onClick={() => navigate(`/orderStatus?receiptId=${receiptId}`)}
            >
              주문현황
            </button>
            <p className={style.headerTitle}>메뉴 주문하기</p>
            <button className={style.call} onClick={openModal}>
              직원호출
            </button>
          </div>
        </header>
        <main>
          {categories.map((category) => (
            <div key={category.menuCategoryId} className={style.menuCategory}>
              <h3>{category.menuCategoryName}</h3>
              <div className={style.menuItems}>
                {menus[category.menuCategoryId]?.map((menu) => (
                  <MenuItem
                    key={menu.menuId}
                    menu={menu}
                    onClick={() => handleMenuClick(menu)}
                  />
                ))}
              </div>
            </div>
          ))}
        </main>
        <button
          className={style.floatingButton}
          onClick={() => navigate(`/orderCart?receiptId=${receiptId}`)}
        >
          <BsCartFill />
        </button>
      </div>
    </>
  );
};

export default OrderMenu;