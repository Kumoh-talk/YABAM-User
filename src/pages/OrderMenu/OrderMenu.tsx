import style from "./OrderMenu.module.css";
import { BsCartFill } from "react-icons/bs";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { MenuCategory, MenuInfoResponse } from "../../types/Menu";
import { toast } from "react-toastify";
import CallStaffModal from "../../components/CallStaffModal/CallStaffModal";
import Menu from "../Menu/Menu";

const OrderMenu = () => {
  const [searchParams] = useSearchParams();
  const storeId = Number(searchParams.get("storeid"));
  const receiptId = searchParams.get("receiptid");
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

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu: MenuInfoResponse) => {
    if (menu.menuIsSoldOut) {
      toast.error("품절된 메뉴는 선택할 수 없습니다.");
      return;
    }
    navigate(`/orderMenuDetail?receiptid=${receiptId}`, { state: { menu } });
  };

  return (
    <>
      {modalOpen && receiptId && (
        <CallStaffModal closeModal={closeModal} receiptId={receiptId} />
      )}
      <div>
        <header>
          <div className={style.top}>
            <button
              className={style.orderStatus}
              onClick={() => {
                if (!receiptId) {
                  toast.error("영수증 정보가 없습니다.");
                  return;
                }
                navigate(`/orderStatus?receiptid=${receiptId}`);
              }}
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
          <Menu storeId={storeId} onMenuClick={handleMenuClick} />
        </main>
        <button
          className={style.floatingButton}
          onClick={() => {
            if (!receiptId) {
              toast.error("영수증 정보가 없습니다.");
              return;
            }
            navigate(`/orderCart?receiptid=${receiptId}`);
          }}
        >
          <BsCartFill />
        </button>
      </div>
    </>
  );
};

export default OrderMenu;
