import Tag from "../Tag/Tag";
import style from "./CallStaffModal.module.css";

type modalType = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// const CallStaffModal = ({ modalOpen, setModalOpen }: modalType)
const CallStaffModal = () => {
  return (
    <div className={style.overlay}>
      <div className={style.callStaffModal}>
        <h5>직원 호출하기</h5>
        <div>
          <Tag content="물" />
        </div>
        <input type="text" placeholder="요청사항을 적어주세요!"></input>
        <div>
          {/* <button onClick={() => setModalOpen(false)}>취소</button> */}
          <button>취소</button>
          <button>저장</button>
        </div>
      </div>
    </div>
  );
};

export default CallStaffModal;
