import style from "./StoreInfo.module.css";
import { FaStar } from "react-icons/fa6";

const StoreInfo = () => {
  return (
    <div className={style.storeInfo}>
      <h3>공대김밥</h3>
      <p className={style.description}>가성비최고, 든든한 김밥 전문점</p>
      <div className={style.info}>
        <p className={style.open}>영업중</p>
        <p>0.1km</p>
        <p>리뷰 수 134 </p>
        <div className={style.review}>
          <FaStar />
          <p>4.0</p>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
