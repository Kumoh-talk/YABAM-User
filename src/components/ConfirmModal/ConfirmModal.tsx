import style from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  title: string; // 모달 제목
  description?: string; // 모달 설명 (선택적)
  cancelText: string; // 취소 버튼 텍스트
  actionText: string; // 액션 버튼 텍스트
  onCancel: () => void; // 취소 버튼 클릭 핸들러
  onAction: () => void; // 액션 버튼 클릭 핸들러
};

const ConfirmModal = ({
  title,
  description,
  cancelText,
  actionText,
  onCancel,
  onAction,
}: ConfirmModalProps) => {
  return (
    <div className={style.overlay} onClick={onCancel}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <p className={style.title}>{title}</p>
        {description && <p className={style.description}>{description}</p>}
        <div className={style.actions}>
          <button className={style.cancelButton} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={style.actionButton} onClick={onAction}>
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;