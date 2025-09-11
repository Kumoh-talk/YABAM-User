import style from "./StoreSkeleton.module.css";

const StoreSkeleton = () => {
  return (
    <div className={style.skeletonItem}>
      <div className={style.skeletonImage} />
      <div className={style.skeletonInfo}>
        <p className={style.skeletonTitle} />
        <p className={style.skeletonDescription} />
        <p className={style.skeletonStatus} />
      </div>
    </div>
  );
};

export default StoreSkeleton;
