import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import style from "./OrderCart.module.css";

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

const OrderCart = () => {
  const [searchParams] = useSearchParams();
  const receiptId = searchParams.get("receiptId");

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "대패삼겹 야미볶음밥",
      description: "대패삼겹과 특제소스",
      price: 9500,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "대패삼겹 야미볶음밥",
      description: "대패삼겹과 특제소스",
      price: 9500,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
    },
  ]);

  const [participants, setParticipants] = useState(3);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>담은 메뉴목록</h1>
      <p className={style.participants}>현재 {participants}명이 함께 주문 중이에요</p>
      <div className={style.cartList}>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className={style.cartItem}>
                <img src={item.imageUrl} alt={item.name} className={style.image} />
                <div className={style.details}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>
                    {item.quantity}개 - {item.price * item.quantity}원
                  </p>
                </div>
                <button className={style.deleteButton} onClick={() => removeItem(item.id)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>장바구니가 비어 있습니다.</p>
        )}
      </div>
      <div className={style.footer}>
        <button
          className={cartItems.length > 0 ? style.orderButton : style.disabledOrderButton}
          disabled={cartItems.length === 0}
        >
          {cartItems.length > 0
            ? `${totalQuantity}개 주문하기 - ${totalPrice}원`
            : "주문하기"}
        </button>
      </div>
    </div>
  );
};

export default OrderCart;