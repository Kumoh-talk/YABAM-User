import style from "./OrderMenu.module.css";
import { BsCartFill } from "react-icons/bs";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { MenuInfoResponse } from "../../types/Menu";
import { toast } from "react-toastify";
import CallStaffModal from "../../components/CallStaffModal/CallStaffModal";
import Menu from "../Menu/Menu";

const OrderMenu = () => {
  const [searchParams] = useSearchParams();
  const storeId = Number(searchParams.get("storeId"));
  const receiptId = searchParams.get("receiptId");
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
      {modalOpen && <CallStaffModal closeModal={closeModal} />}
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
                navigate(`/orderStatus?receiptId=${receiptId}`);
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
            navigate(`/orderCart?receiptId=${receiptId}`);
          }}
        >
          <BsCartFill />
        </button>
      </div>
    </>
  );
};

export default OrderMenu;
