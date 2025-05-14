import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getNonAdjustReceipt, createReceipt } from '../../api/receipt';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableValidationPage = () => {
  const [searchParams] = useSearchParams();
  const tableId = Number(searchParams.get('tableId'));
  const storeId = Number(searchParams.get('storeId'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!tableId || !storeId || isNaN(tableId) || isNaN(storeId)) {
      toast.error('올바르지 않은 테이블 정보입니다.');
      return;
    }

    const handleReceipt = async () => {
      try {
        const receiptId = await getNonAdjustReceipt(tableId);
        if (receiptId) {
          navigate(`/order?receiptId=${receiptId}&storeId=${storeId}`);
        } else {
          const { id: newReceiptId } = await createReceipt(storeId, tableId);
          navigate(`/order?receiptId=${newReceiptId}&storeId=${storeId}`);
        }
      } catch (error) {
        console.error('영수증 처리 실패:', error);
        toast.error('서버와 통신 중 오류가 발생했어요. 다시 시도해주세요.');
      }
    };

    handleReceipt();
  }, [tableId, storeId, navigate]);

  return <div>테이블 상태 확인 중입니다...</div>;
};

export default TableValidationPage;