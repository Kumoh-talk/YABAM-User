import type { MenuCategory, MenuInfoResponse } from "../../types/Menu";
import MenuItem from "../MenuItem/MenuItem";
import MenuSkeleton from "../Skeleton/MenuSkeleton/MenuSkeleton";
import style from "./MenuList.module.css";

type PropsType = {
  loading: boolean;
  menus: Record<number, MenuInfoResponse[]>;
  category: MenuCategory;
  onMenuClick?: (menu: MenuInfoResponse) => void;
};

const MenuList = ({ loading, menus, category, onMenuClick }: PropsType) => {
  return (
    <div className={style.menuCategory}>
      <h3>{category.menuCategoryName}</h3>
      <div className={style.menuItems}>
        {menus[category.menuCategoryId]?.map((menu) => (
          <MenuItem
            key={menu.menuId}
            menu={menu}
            {...(onMenuClick && { onClick: () => onMenuClick(menu) })}
          />
        ))}

        {loading &&
          Array.from({ length: 3 }).map((_, idx) => <MenuSkeleton key={idx} />)}
      </div>
    </div>
  );
};

export default MenuList;
