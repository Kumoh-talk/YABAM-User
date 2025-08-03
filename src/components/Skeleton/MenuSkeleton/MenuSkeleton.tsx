import style from "./MenuSkeleton.module.css";
const MenuSkeleton = () => {
  return (
    <div className={style.skeletonMenuWrapper}>
      <h3 className={style.skeletonMenuCategory} />
      <div className={style.skeletonMenuItem}>
        <div className={style.skeletonMenuImage} />
        <div className={style.skeletonMenuContents}>
          <p />
          <p />
          <p />
        </div>
      </div>
    </div>
  );
};

export default MenuSkeleton;
