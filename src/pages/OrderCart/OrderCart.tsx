import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import style from "./OrderCart.module.css";
import { getCartItems, deleteCartItem } from "../../api/cart";
import { toast } from "react-toastify"; // react-toastify 추가
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal"; // ConfirmModal 추가
import type { CartMenuDto } from "../../types/Cart";

const OrderCart = () => {
  const [searchParams] = useSearchParams();
  const receiptId = searchParams.get("receiptId");

  const [cartItems, setCartItems] = useState<CartMenuDto[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null); // 삭제할 메뉴 ID
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

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
        toast.error("장바구니 데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchCartItems();
  }, [receiptId]);

  // 삭제 확인 모달 열기
  const openDeleteModal = (menuId: number) => {
    setSelectedMenuId(menuId);
    setIsModalOpen(true);
  };

  // 삭제 확인 모달 닫기
  const closeDeleteModal = () => {
    setSelectedMenuId(null);
    setIsModalOpen(false);
  };

  // 장바구니 아이템 삭제
  const removeItem = async () => {
    if (!receiptId || selectedMenuId === null) return;

    try {
      await deleteCartItem(receiptId, selectedMenuId); // API 호출
      setCartItems((prev) => prev.filter((item) => item.menuId !== selectedMenuId)); // 로컬 상태 업데이트
      toast.success("메뉴가 장바구니에서 삭제되었습니다.");
    } catch (error) {
      console.error("장바구니 아이템 삭제 실패:", error);
      toast.error("메뉴를 삭제하는 데 실패했습니다. 다시 시도해주세요.");
    } finally {
      closeDeleteModal(); // 모달 닫기
    }
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
                  onClick={() => openDeleteModal(item.menuId)} // 삭제 버튼 클릭 시 모달 열기
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

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <ConfirmModal
          title="정말 삭제하시겠어요?"
          description="해당 메뉴가 장바구니에서 삭제됩니다."
          cancelText="취소"
          actionText="삭제"
          onCancel={closeDeleteModal} // 취소 버튼 클릭 시
          onAction={removeItem} // 삭제 버튼 클릭 시
        />
      )}
    </div>
  );
};

export default OrderCart;