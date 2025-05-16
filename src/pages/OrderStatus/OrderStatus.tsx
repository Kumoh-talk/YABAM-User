import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { getReceiptDetails } from "../../api/receipt";
import type { OrderAndMenusResponse, OrderMenuResponse } from "../../types/Receipt";
import style from "./OrderStatus.module.css";

const OrderStatus = () => {
  const [searchParams] = useSearchParams();
  const receiptId = searchParams.get("receiptId");
  const [orderAndMenus, setOrderAndMenus] = useState<OrderAndMenusResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      if (!receiptId) return;

      try {
        const data = await getReceiptDetails(receiptId);
        setOrderAndMenus(data.orderAndMenusResponses);
      } catch (error) {
        console.error("주문 현황 데이터를 불러오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
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
                  <button className={style.cancelBtn}>
                    <IoTrashOutline />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;