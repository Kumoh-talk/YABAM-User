import type { StoreResponse } from "../../types/Store";
import style from "./StoreInfo.module.css";

type storeInfoType = {
  storeInfo: StoreResponse | undefined;
};
const StoreInfo = ({ storeInfo }: storeInfoType) => {
  return (
    <div className={style.storeInfo}>
      <div className={style.title}>
        <h3>{storeInfo?.storeName}</h3>
        <p className={style.open}>
          {storeInfo?.isOpen ? "영업중" : "영업종료"}
        </p>
      </div>
      <p className={style.description}>{storeInfo?.description}</p>
    </div>
  );
};

export default StoreInfo;
