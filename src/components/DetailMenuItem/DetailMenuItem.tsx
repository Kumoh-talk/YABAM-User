import style from "./DetailMenuItem.module.css";
import Tag from "../Tag/Tag";

const DetailMenuItem = () => {
  return (
    <div className={style.detailMenuItem}>
      <Tag content="주인장 추천!" />
      <h2>우삼겹 야미보끔뱝</h2>
      <p className={style.price}>9500원</p>
      <p className={style.description}>우삼겹과 볶음밥의 만남</p>
    </div>
  );
};

export default DetailMenuItem;
