import style from "./BottomNav.module.css";
import { TbHomeFilled } from "react-icons/tb";
import { BsCamera } from "react-icons/bs";
import { IoReceiptOutline } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";

const BottomNav = () => {
  return (
    <div className={style.bottomNav}>
      <div className={style.icon}>
        <div>
          <TbHomeFilled />
        </div>

        <label>홈</label>
      </div>
      <div className={style.icon}>
        <div>
          <BsCamera />
        </div>
        <label>주문하기</label>
      </div>
      <div className={style.icon}>
        <div>
          <IoReceiptOutline />
        </div>
        <label>주문내역</label>
      </div>
      <div className={style.icon}>
        <div>
          <PiUserCircle />
        </div>
        <label>마이</label>
      </div>
    </div>
  );
};

export default BottomNav;
