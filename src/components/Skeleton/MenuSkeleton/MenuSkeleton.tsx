import style from "./MenuSkeleton.module.css";
const MenuSkeleton = () => {
  return (
    <div className={style.skeletonMenuWrapper}>
      <div className={style.skeletonMenuImage} />
      <div className={style.skeletonMenuContents}>
        <p className={style.title} />
        <p className={style.description} />
        <p className={style.price} />
      </div>
    </div>
  );
};

export default MenuSkeleton;
