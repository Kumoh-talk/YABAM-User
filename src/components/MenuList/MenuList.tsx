import type { MenuCategory, MenuInfoResponse } from "../../types/Menu";
import MenuItem from "../MenuItem/MenuItem";
import style from "./MenuList.module.css";

type PropsType = {
  menus: Record<number, MenuInfoResponse[]>;
  category: MenuCategory;
  onMenuClick?: (menu: MenuInfoResponse) => void;
};

const MenuList = ({ menus, category, onMenuClick }: PropsType) => {
  return (
    <div className={style.menuCategory}>
      <h3>{category.menuCategoryId}</h3>
      <div className={style.menuItems}>
        {menus[category.menuCategoryId]?.map((menu) => (
          <MenuItem
            key={menu.menuId}
            menu={menu}
            {...(onMenuClick && { onClick: () => onMenuClick(menu) })}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
