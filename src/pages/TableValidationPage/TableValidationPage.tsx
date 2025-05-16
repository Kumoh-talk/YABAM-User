import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getNonAdjustReceipt, createReceipt } from "../../api/receipt";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableValidationPage = () => {
  const [searchParams] = useSearchParams();
  const tableId = Number(searchParams.get("tableid"));
  const storeId = Number(searchParams.get("storeid"));
  const navigate = useNavigate();
  const [loadingMessage, setLoadingMessage] =
    useState("테이블 정보를 확인 중입니다...");

  useEffect(() => {
    if (!tableId || !storeId || isNaN(tableId) || isNaN(storeId)) {
      toast.error("올바르지 않은 QR 코드입니다. 매장 직원에게 문의해주세요.");
      return;
    }

    const redirectToOrderMenu = (receiptId: string) => {
      navigate(`/orderMenu?receiptId=${receiptId}&storeId=${storeId}`);
    };

    const handleReceipt = async () => {
      setLoadingMessage("주문 정보를 불러오고 있어요...");
      try {
        const receiptId = await getNonAdjustReceipt(tableId);

        if (receiptId) {
          redirectToOrderMenu(receiptId);
        } else {
          setLoadingMessage("QR코드가 인식된 테이블과 연결 중입니다");
          const { id: newReceiptId } = await createReceipt(storeId, tableId);
          redirectToOrderMenu(newReceiptId);
        }
      } catch (error) {
        toast.error("서버와 연결할 수 없어요. 잠시 후 다시 시도해주세요.");
      }
    };

    handleReceipt();
  }, [tableId, storeId, navigate]);

  return (
    <div style={{ textAlign: "center", paddingTop: "100px", fontSize: "18px" }}>
      <div>{loadingMessage}</div>
    </div>
  );
};

export default TableValidationPage;
