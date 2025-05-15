import { useState } from "react";
import style from "./CallStaffModal.module.css";

type modalType = {
  closeModal: () => void;
};

const CallStaffModal = ({ closeModal }: modalType) => {
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
  const toggleTagItem = (text: string) => {
    setSelected((prev) =>
      prev.includes(text)
        ? prev.filter((item) => item !== text)
        : [...prev, text]
    );
    console.log(selected);
  };

  const [requestMessage, setRequestMessage] = useState<string>("");
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestMessage(e.target.value);
    console.log(requestMessage);
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
          <button className={style.save}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default CallStaffModal;
