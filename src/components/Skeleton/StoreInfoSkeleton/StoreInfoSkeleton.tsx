import style from "./StoreInfoSkeleton.module.css";

const StoreInfoSkeleton = () => {
  return (
    <div className={style.skeletonStoreInfo}>
      <p className={style.skeletonTitle} />
      <p className={style.skeletonDescription} />
    </div>
  );
};

export default StoreInfoSkeleton;
