import { useState } from "react";
import style from "./MenuItem.module.css";
import Tag from "../Tag/Tag";
import type { MenuInfoResponse } from "../../types/Menu";

type MenuItemProps = {
  menu: MenuInfoResponse;
  onClick?: () => void;
};

const MenuItem = ({ menu, onClick }: MenuItemProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleImageClick = () => {
    if (menu.menuImageUrl) {
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div
        className={`${style.menuItem} ${menu.menuIsSoldOut ? style.soldOut : ""}`}
        onClick={onClick}
      >
        <div className={style.img} onClick={handleImageClick}>
          <img src={menu.menuImageUrl} alt={menu.menuName} />
        </div>
        <div className={style.contents}>
          {menu.menuIsSoldOut && <p className={style.soldOutText}>품절</p>}
          {menu.menuIsRecommended && <Tag content="주인장 추천!" />}
          <h4>{menu.menuName}</h4>
          <p className={style.description}>{menu.menuDescription}</p>
          <p className={style.price}>{menu.menuPrice.toLocaleString()}원</p>
        </div>
      </div>

      {isPopupOpen && (
        <div className={style.popupOverlay} onClick={closePopup}>
          <div className={style.popupContent} onClick={(e) => e.stopPropagation()}>
            <img src={menu.menuImageUrl} alt={menu.menuName} />
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItem;
