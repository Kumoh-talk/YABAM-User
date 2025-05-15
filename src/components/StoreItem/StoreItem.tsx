import style from "./StoreItem.module.css";

type StoreItemProps = {
  storeName: string;
  isOpened: boolean;
  headImageUrl: string;
  description: string;
};

const StoreItem = ({ storeName, isOpened, headImageUrl, description }: StoreItemProps) => {
  return (
    <div className={style.storeItem}>
      <div className={style.storeInfo}>
        <div className={style.storeImg}>
          <img src={headImageUrl} alt={storeName} />
        </div>
        <div className={style.title}>
          <h4>{storeName}</h4>
          <p className={style.description}>{description}</p>
          <p className={style.status}>{isOpened ? "영업중" : "영업 종료"}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
