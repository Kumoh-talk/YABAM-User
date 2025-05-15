import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import style from "./OrderCart.module.css";
import { getCartItems } from "../../api/cart";
import type { CartMenuDto } from "../../types/Cart";

const OrderCart = () => {
  const [searchParams] = useSearchParams();
  const receiptId = searchParams.get("receiptId");

  const [cartItems, setCartItems] = useState<CartMenuDto[]>([]);

  // 총 가격 및 수량 계산
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 장바구니 데이터 가져오기
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!receiptId) return;

      try {
        const cartData = await getCartItems(receiptId);
        setCartItems(cartData.cartMenuDtos);
      } catch (error) {
        console.error("장바구니 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchCartItems();
  }, [receiptId]);

  // 장바구니 아이템 삭제
  const removeItem = (menuId: number) => {
    setCartItems((prev) => prev.filter((item) => item.menuId !== menuId));
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>담은 메뉴목록</h1>
      <div className={style.cartList}>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.menuId} className={style.cartItem}>
                <img src={item.imageUrl} alt={item.name} className={style.image} />
                <div className={style.details}>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>
                    {item.quantity}개 - {item.price * item.quantity}원
                  </p>
                </div>
                <button
                  className={style.deleteButton}
                  onClick={() => removeItem(item.menuId)}
                >
                  <IoTrashOutline />
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