import style from "./MenuItem.module.css";
import Tag from "../Tag/Tag";
import type { MenuInfoResponse } from "../../types/Menu";

type MenuItemProps = {
  menu: MenuInfoResponse;
  onClick?: () => void;
};

const MenuItem = ({ menu, onClick }: MenuItemProps) => {
  return (
    <div
      className={`${style.menuItem} ${menu.menuIsSoldOut ? style.soldOut : ""}`}
      onClick={onClick}
    >
      <div className={style.img}>
        <img src={menu.menuImageUrl} alt={menu.menuName} />
      </div>
      <div className={style.contents}>
        {menu.menuIsRecommended && <Tag content="주인장 추천!" />}
        <h4>{menu.menuName}</h4>
        <p className={style.description}>{menu.menuDescription}</p>
        <p className={style.price}>{menu.menuPrice.toLocaleString()}원</p>
        {menu.menuIsSoldOut && <p className={style.soldOutText}>품절</p>}
      </div>
    </div>
  );
};

export default MenuItem;
