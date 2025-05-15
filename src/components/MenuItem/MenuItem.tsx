import { useNavigate } from "react-router-dom";
import style from "./MenuItem.module.css";
import Tag from "../Tag/Tag";
import { toast } from "react-toastify";
import type { MenuInfoResponse } from "../../types/Menu";

type MenuItemProps = {
  menu: MenuInfoResponse;
};

const MenuItem = ({ menu }: MenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (menu.menuIsSoldOut) {
      toast.error("품절된 메뉴는 선택할 수 없습니다.");
      return;
    }
    navigate(`/orderMenuItem?menuId=${menu.menuId}`);
  };

  return (
    <div className={style.menuItem} onClick={handleClick}>
      {menu.menuImageUrl ? (
        <div className={style.img}>
          <img src={menu.menuImageUrl} alt={menu.menuName} />
        </div>
      ) : null}
      <div className={style.contents}>
        {menu.menuIsRecommended && <Tag content="주인장 추천!" />}
        <h4>{menu.menuName}</h4>
        <p className={style.description}>{menu.menuDescription}</p>
        <p className={style.price}>{menu.menuPrice}원</p>
        {menu.menuIsSoldOut && <p className={style.soldOut}>품절</p>}
      </div>
    </div>
  );
};

export default MenuItem;