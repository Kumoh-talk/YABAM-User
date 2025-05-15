import style from "./StoreItem.module.css";

const StoreItem = () => {
  const menuImg: string[] = [
    "이미지1",
    "이미지2",
    "이미지3",
    "이미지4",
    "이미지5",
  ];

  return (
    <div className={style.storeItem}>
      <div className={style.storeInfo}>
        <div className={style.storeImg}>
          <div>""</div>
        </div>
        <div className={style.title}>
          <h4>공대김밥</h4>
          <p className={style.description}>가성비 최고, 든든한 김밥 전문점</p>
          <p className={style.status}>영업중</p>
        </div>
      </div>
      <div className={style.menuImg}>
        {menuImg.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default StoreItem;
