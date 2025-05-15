import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import style from "./OrderCart.module.css";
import { getCartItems, deleteCartItem } from "../../api/cart";
import { createOrderWithCart } from "../../api/order";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import type { CartMenuDto } from "../../types/Cart";

const OrderCart = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const receiptId = searchParams.get("receiptId");

  const [cartItems, setCartItems] = useState<CartMenuDto[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // 총 가격 및 수량 계산
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 장바구니 데이터 가져오기
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

  // 1초마다 장바구니 데이터를 갱신 (폴링 방식)
  useEffect(() => {
    fetchCartItems();

    const intervalId = setInterval(() => {
      fetchCartItems();
    }, 1000);

    return () => {
      clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
    };
  }, [receiptId]);

  // 삭제하기 모달 열기
  const openDeleteModal = (menuId: number) => {
    setSelectedMenuId(menuId);
    setIsModalOpen(true);
  };

  // 삭제하기 모달 닫기
  const closeDeleteModal = () => {
    setSelectedMenuId(null);
    setIsModalOpen(false);
  };

  // 주문하기 모달 열기
  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  // 주문하기 모달 닫기
  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  // 장바구니 아이템 삭제
  const removeItem = async () => {
    if (!receiptId || selectedMenuId === null) return;

    try {
      await deleteCartItem(receiptId, selectedMenuId);
      setCartItems((prev) => prev.filter((item) => item.menuId !== selectedMenuId));
      toast.success("메뉴가 장바구니에서 삭제되었습니다.");
    } catch (error) {
      toast.error("메뉴를 삭제하는 데 실패했습니다. 다시 시도해주세요.");
    } finally {
      closeDeleteModal();
    }
  };

  // 주문 생성
  const createOrder = async () => {
    if (!receiptId) return;

    try {
      await createOrderWithCart(receiptId);
      toast.success("주문이 성공적으로 완료되었습니다!");
      setCartItems([]); // 주문 완료 후 장바구니 비우기
      closeOrderModal();
      navigate(-1);
    } catch (error) {
      toast.error("주문을 생성하는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>장바구니</h1>
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
                  onClick={() => openDeleteModal(item.menuId)}
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
          onClick={openOrderModal}
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
          onCancel={closeDeleteModal}
          onAction={removeItem}
        />
      )}

      {/* 주문 확인 모달 */}
      {isOrderModalOpen && (
        <ConfirmModal
          title="주문을 완료하시겠어요?"
          description="장바구니에 담긴 메뉴로 주문이 생성됩니다."
          cancelText="취소"
          actionText="주문하기"
          onCancel={closeOrderModal}
          onAction={createOrder}
        />
      )}
    </div>
  );
};

export default OrderCart;