import style from "./StoreItem.module.css";

type StoreItemProps = {
  storeName: string;
  isOpened: boolean;
  headImageUrl: string;
  description: string;
  storeInfoImageUrl: string[]; // 가게 상세 이미지 리스트
};

const StoreItem = ({
  storeName,
  isOpened,
  headImageUrl,
  description,
  storeInfoImageUrl,
}: StoreItemProps) => {
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
      <div className={style.storeInfoImageUrl}>
        {storeInfoImageUrl.map((url, index) => {
          const fixedUrl =
            url.startsWith("https:/") && !url.startsWith("https://")
              ? url.replace("https:/", "https://")
              : url;

          return (
            <div key={index} className={style.storeInfoImageUrlItem}>
              <img
                src={fixedUrl}
                alt={`가게 이미지 ${index + 1}`}
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreItem;
