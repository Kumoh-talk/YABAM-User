import { useState } from "react";
import { toast } from "react-toastify";
import { callStaff } from "../../api/callStaff";
import style from "./CallStaffModal.module.css";

type modalType = {
  closeModal: () => void;
  receiptId: string; // 영수증 ID
};

const CallStaffModal = ({ closeModal, receiptId }: modalType) => {
  const requestItem: string[] = [
    "물",
    "앞접시",
    "휴지",
    "물티슈",
    "숟가락",
    "젓가락",
    "소주컵",
    "종이컵",
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [requestMessage, setRequestMessage] = useState<string>("");

  const toggleTagItem = (text: string) => {
    setSelected((prev) => {
      const updatedSelected = prev.includes(text)
        ? prev.filter((item) => item !== text)
        : [...prev, text];

      setRequestMessage(
        updatedSelected.length > 0
          ? `${updatedSelected.join(", ")} 주세요!`
          : ""
      );

      return updatedSelected;
    });
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestMessage(e.target.value);
  };

  const handleSave = async () => {
    if (!requestMessage.trim()) {
      toast.error("요청 메시지를 입력해주세요.");
      return;
    }

    const toastId = toast.loading("요청을 전송 중입니다...");

    try {
      await callStaff(receiptId, requestMessage);
      toast.update(toastId, {
        render: "호출 요청이 성공적으로 전송되었습니다.",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("호출 요청 실패:", error);
      toast.update(toastId, {
        render: "호출 요청 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className={style.overlay} onClick={closeModal}>
      <div
        className={style.callStaffModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h4>직원 호출하기</h4>
        <div className={style.tagBox}>
          {requestItem.map((text) => (
            <button
              className={`${style.tag} ${
                selected.includes(text) ? style.selected : ""
              }`}
              key={text}
              onClick={() => toggleTagItem(text)}
            >
              {text}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="요청사항을 적어주세요!"
          value={requestMessage}
          onChange={onChangeMessage}
        ></input>
        <div className={style.button}>
          <button className={style.cancel} onClick={closeModal}>
            취소
          </button>
          <button className={style.save} onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallStaffModal;
