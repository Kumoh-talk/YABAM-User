import { useState } from "react";
import DetailMenuItem from "../../components/DetailMenuItem/DetailMenuItem";
import style from "./OrderMenuItem.module.css";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
const OrderMenuItem = () => {
  const [count, setCount] = useState<number>(1);

  const plusCount = () => {
    if (count >= 10) {
      return;
    }
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (count <= 1) {
      return;
    }
    setCount((prev) => prev - 1);
  };

  const saveMenu = () => {
    console.log("메뉴 담기");
  };

  return (
    <div className={style.orderMenuItem}>
      <div className={style.img}>이미지</div>
      <DetailMenuItem />
      <div className={style.addMenu}>
        <div className={style.counterBox}>
          <p>주문 수량 {count}개</p>
          <div className={style.counter}>
            <button onClick={minusCount}>
              <LuMinus />
            </button>
            <div className={style.verticleLine}></div>
            <button onClick={plusCount}>
              <LuPlus />
            </button>
          </div>
        </div>
        <button onClick={saveMenu}>메뉴 담기({count}개)</button>
      </div>
    </div>
  );
};

export default OrderMenuItem;
