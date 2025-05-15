import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import style from "./OrderStatus.module.css";

type OrderStatus = "ORDERED" | "COOKING" | "CANCELED" | "COMPLETED";

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  orderMenuStatus: OrderStatus;
};

const OrderStatus = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "대패삼겹 야미볶음밥",
      description: "대패삼겹과 특제소스",
      price: 9500,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
      orderMenuStatus: "ORDERED",
    },
    {
      id: 2,
      name: "우삼겹 야미볶음밥",
      description: "우삼겹과 볶음밥의 만남",
      price: 9500,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
      orderMenuStatus: "COOKING",
    },
    {
      id: 3,
      name: "직화불고기 야미볶음밥",
      description: "불고기와 야채의 환상조합",
      price: 10000,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
      orderMenuStatus: "CANCELED",
    },
  ]);

  const handleCancel = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const renderStatusTag = (status: OrderStatus) => {
    switch (status) {
      case "ORDERED":
        return <span className={style.tagOrdered}>접수 대기</span>;
      case "COOKING":
        return <span className={style.tagCooking}>조리 중</span>;
      case "COMPLETED":
        return <span className={style.tagCompleted}>완료</span>;
      case "CANCELED":
        return <span className={style.tagCanceled}>취소됨</span>;
    }
  };

  return (
    <div className={style.container}>
      <h2>주문 현황</h2>
      {cartItems.length === 0 ? (
        <p>주문 내역이 없습니다. 메뉴를 주문해주세요!</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className={`${style.item} ${
              item.orderMenuStatus === "CANCELED" ? style.canceled : ""
            }`}
          >
            <img src={item.imageUrl} alt={item.name} />
            <div className={style.details}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>
                {item.price.toLocaleString()}원 · {item.quantity}개
              </p>
              {renderStatusTag(item.orderMenuStatus)}
            </div>
            {item.orderMenuStatus === "ORDERED" && (
              <button
                className={style.cancelBtn}
                onClick={() => handleCancel(item.id)}
              >
                <IoTrashOutline />
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderStatus;