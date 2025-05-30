import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getNonAdjustReceipt, createReceipt } from "../../api/receipt";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";

const TableValidationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loadingMessage, setLoadingMessage] =
    useState("테이블 정보를 확인 중입니다...");

  const tableId = searchParams.get("tableid");
  const storeId = Number(searchParams.get("storeid"));

  useEffect(() => {
    if (!tableId || !storeId || isNaN(storeId)) {
      toast.error("올바르지 않은 QR 코드입니다. 매장 직원에게 문의해주세요.");
      return;
    }

    const redirectToOrderMenu = (receiptId: string) => {
      navigate(`/orderMenu?receiptid=${receiptId}&storeid=${storeId}`);
    };

    const handleReceipt = async () => {
      setLoadingMessage("주문 정보를 불러오고 있어요...");
      try {
        // 미정산 영수증 조회
        const receiptId = await getNonAdjustReceipt(tableId);

        if (receiptId) {
          // 미정산 영수증이 존재하면 바로 이동
          redirectToOrderMenu(receiptId);
        } else {
          // 미정산 영수증이 없으면 새로 생성
          setLoadingMessage("QR코드가 인식된 테이블과 연결 중입니다");
          const { receiptId: newReceiptId } = await createReceipt(storeId, tableId);
          redirectToOrderMenu(newReceiptId);
        }
      } catch (error) {
        console.error("Error in handleReceipt:", error);
        toast.error("서버와 연결할 수 없어요. 잠시 후 다시 시도해주세요.");
      }
    };

    handleReceipt();
  }, [tableId, storeId, navigate]);

  return (
    <div style={{ textAlign: "center", paddingTop: "100px", fontSize: "18px" }}>
      <Loading msg={loadingMessage} />
    </div>
  );
};

export default TableValidationPage;
