import { useNavigate } from "react-router-dom";
import Tag from "../Tag/Tag";
import style from "./MenuItem.module.css";

const MenuItem = () => {
  const navigate = useNavigate();

  return (
    <div className={style.menuItem} onClick={() => navigate("/orderMenuItem")}>
      <div className={style.img}>
        <div>이미지</div>
      </div>
      <div className={style.contents}>
        <Tag content="주인장 추천!" />
        <h4>우삼겹 야미보끔뱝</h4>
        <p className={style.description}>우삼겹과 볶음밥의 만남</p>
        <p className={style.price}>9500원</p>
      </div>
    </div>
  );
};

export default MenuItem;
