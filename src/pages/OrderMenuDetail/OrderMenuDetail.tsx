import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; // useNavigate 추가
import style from "./OrderMenuDetail.module.css";
import { LuPlus, LuMinus } from "react-icons/lu";
import { toast } from "react-toastify";
import { addOrUpdateCartItem } from "../../api/cart";
import type { MenuInfoResponse } from "../../types/Menu";

const OrderMenuDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const receiptId = searchParams.get("receiptid"); // URL에서 receiptId 가져오기
  const location = useLocation();
  const menu = location.state?.menu as MenuInfoResponse;
  const [count, setCount] = useState<number>(1);

  const plusCount = () => {
    if (count >= 10) return;
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };

  const saveMenu = async () => {
    try {
      await addOrUpdateCartItem(receiptId!, menu.menuId, count);
      toast.success("장바구니에 메뉴가 추가되었습니다!");
      navigate(-1);
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      toast.error(
        "장바구니에 메뉴를 추가하는 데 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  if (!menu) {
    return <div>메뉴 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={style.orderMenuDetail}>
      <div className={style.img}>
        <img src={menu.menuImageUrl} alt={menu.menuName} />
      </div>
      <div className={style.contents}>
        {menu.menuIsRecommended && (
          <p className={style.recommended}>사장님 추천!</p>
        )}
        <h2>{menu.menuName}</h2>
        <p>{menu.menuDescription}</p>
        <p>{menu.menuPrice.toLocaleString()}원</p>
      </div>
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
      </div>
      <div className={style.footer}>
        <button onClick={saveMenu}>메뉴 담기({count}개)</button>
      </div>
    </div>
  );
};

export default OrderMenuDetail;
