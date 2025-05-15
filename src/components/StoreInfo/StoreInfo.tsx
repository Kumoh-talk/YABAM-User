import style from "./StoreInfo.module.css";
import { FaStar } from "react-icons/fa6";

const StoreInfo = () => {
  return (
    <div className={style.storeInfo}>
      <div className={style.title}>
        <h3>공대김밥</h3>
        <p className={style.open}>영업중</p>
      </div>
      <p className={style.description}>가성비최고, 든든한 김밥 전문점</p>
    </div>
  );
};

export default StoreInfo;
