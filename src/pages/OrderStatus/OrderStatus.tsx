import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { getReceiptDetails } from "../../api/receipt";
import { updateOrderMenuStatus } from "../../api/order";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import type { OrderAndMenusResponse, OrderMenuResponse } from "../../types/Receipt";
import style from "./OrderStatus.module.css";

const OrderStatus = () => {
  const [searchParams] = useSearchParams();
  const receiptId = searchParams.get("receiptid");
  const [orderAndMenus, setOrderAndMenus] = useState<OrderAndMenusResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrderMenuId, setSelectedOrderMenuId] = useState<number | null>(null);

  // 주문 현황 데이터 조회 함수
  const fetchOrderStatus = async () => {
    if (!receiptId) return;

    try {
      const data = await getReceiptDetails(receiptId);
      setOrderAndMenus(data.orderAndMenusResponses);
    } catch (error) {
      console.error("주문 현황 데이터를 불러오는 데 실패했습니다:", error);
      toast.error("주문 현황 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderStatus();

    const intervalId = setInterval(() => {
      fetchOrderStatus();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [receiptId]);

  const renderStatusTag = (status: string) => {
    switch (status) {
      case "ORDERED":
        return <span className={style.tagOrdered}>접수 대기</span>;
      case "COOKING":
        return <span className={style.tagCooking}>조리 중</span>;
      case "COMPLETED":
        return <span className={style.tagCompleted}>완료</span>;
      case "CANCELED":
        return <span className={style.tagCanceled}>취소됨</span>;
      default:
        return null;
    }
  };

  const handleCancel = async () => {
    if (selectedOrderMenuId === null) return;

    const toastId = toast.loading("취소 요청 중입니다...");

    try {
      await updateOrderMenuStatus(selectedOrderMenuId, "CANCELED");
      setOrderAndMenus((prev) =>
        prev.map((order) => ({
          ...order,
          orderMenus: order.orderMenus.map((menu) =>
            menu.orderMenuId === selectedOrderMenuId
              ? { ...menu, orderMenuStatus: "CANCELED" }
              : menu
          ),
        }))
      );
      toast.update(toastId, {
        render: "주문 메뉴가 성공적으로 취소되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setSelectedOrderMenuId(null);
    } catch (error) {
      console.error("주문 메뉴 취소 실패:", error);
      toast.update(toastId, {
        render: "주문 메뉴 취소 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (orderAndMenus.length === 0) {
    return <p>주문 내역이 없습니다. 메뉴를 주문해주세요!</p>;
  }

  return (
    <div className={style.container}>
      <h2>주문 현황</h2>
      {orderAndMenus.map((order) => (
        <div key={order.orderId} className={style.order}>
          <h3>주문 ID: {order.orderId}</h3>
          <p>총 가격: {order.totalPrice.toLocaleString()}원</p>
          <div className={style.orderMenus}>
            {order.orderMenus.map((menu: OrderMenuResponse) => (
              <div
                key={menu.orderMenuId}
                className={`${style.item} ${
                  menu.orderMenuStatus === "CANCELED" ? style.canceled : ""
                }`}
              >
                <img src={menu.menuInfo.menuImageUrl} alt={menu.menuInfo.menuName} />
                <div className={style.details}>
                  <h4>{menu.menuInfo.menuName}</h4>
                  <p>{menu.menuInfo.menuDescription}</p>
                  <p>
                    {menu.menuInfo.menuPrice.toLocaleString()}원 · {menu.quantity}개
                  </p>
                  {renderStatusTag(menu.orderMenuStatus)}
                </div>
                {menu.orderMenuStatus === "ORDERED" && (
                  <button
                    className={style.cancelBtn}
                    onClick={() => setSelectedOrderMenuId(menu.orderMenuId)}
                  >
                    <IoTrashOutline />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedOrderMenuId !== null && (
        <ConfirmModal
          title="주문 메뉴 취소"
          description="해당 메뉴를 취소하시겠습니까?"
          cancelText="취소"
          actionText="확인"
          onCancel={() => setSelectedOrderMenuId(null)}
          onAction={handleCancel} // 취소 처리 함수 연결
        />
      )}
    </div>
  );
};

export default OrderStatus;