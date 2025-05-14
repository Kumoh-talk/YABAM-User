import style from "./Review.module.css";
import { FaStar } from "react-icons/fa6";

const Review = () => {
  return (
    <div className={style.review}>
      <div className={style.img}>이미지</div>
      <div className={style.contents}>
        <p className={style.nickName}>축제홀릭</p>
        <p className={style.content}>어쩌고저쩌고어쩌고저쩌고</p>
      </div>
      <div className={style.score}>
        <FaStar />
        <p>4.0</p>
      </div>
    </div>
  );
};

export default Review;
