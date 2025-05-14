import style from "./OrderMenu.module.css";
import { IoCloseOutline } from "react-icons/io5";
import MenuItem from "../../components/MenuItem/MenuItem";
import Tag from "../../components/Tag/Tag";
import { useState } from "react";
import CallStaffModal from "../../components/CallStaffModal/CallStaffModal";

const OrderMenu = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onClickCallStaff = () => {
    setModalOpen(true);
    console.log("직원호출");
  };

  return (
    <div>
      <header>
        <div className={style.top}>
          <IoCloseOutline />
          <p className={style.headerTitle}>메뉴 주문하기</p>
          <button className={style.call} onClick={onClickCallStaff}>
            직원호출
          </button>
        </div>
        <div className={style.bottom}>
          <Tag content="추천 메뉴" />
          <Tag content="한식" />
          <Tag content="일식" />
          <Tag content="양식" />
          <Tag content="중식" />
        </div>
      </header>
      <main>
        <div className={style.menuCategory}>
          <h3>추천 메뉴</h3>
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
        <div className={style.menuCategory}>
          <h3>한식</h3>
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
        <div className={style.menuCategory}>
          <h3>두식ㅋㅋ</h3>
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </main>
      {/* {modalOpen ? (
        <CallStaffModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      ) : null} */}
    </div>
  );
};

export default OrderMenu;
