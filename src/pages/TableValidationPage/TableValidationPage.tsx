import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getNonAdjustReceipt, createReceipt } from '../../api/receipt';

const TableValidationPage = () => {
  const [searchParams] = useSearchParams();
  const tableId = Number(searchParams.get('tableId'));
  const storeId = Number(searchParams.get('storeId'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!tableId || !storeId) {
      // 필수 파라미터 누락 시 에러 페이지 이동
      navigate('/error');
      return;
    }

    const handleReceipt = async () => {
      try {
        const receiptId = await getNonAdjustReceipt(tableId);
        if (receiptId) {
          // 기존 영수증 → 주문 페이지로 이동
          navigate(`/order?receiptId=${receiptId}&storeId=${storeId}`);
        } else {
          // 영수증 생성 → 주문 페이지로 이동
          const { id: newReceiptId } = await createReceipt(storeId, tableId);
          navigate(`/order?receiptId=${newReceiptId}&storeId=${storeId}`);
        }
      } catch (error) {
        console.error('영수증 처리 실패:', error);
        navigate('/error');
      }
    };

    handleReceipt();
  }, [tableId, storeId, navigate]);

  return <div>테이블 상태 확인 중입니다...</div>;
};

export default TableValidationPage;