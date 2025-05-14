import style from "./StoreItem.module.css";

const StoreItem = () => {
  return (
    <div className={style.storeItem}>
      <div className={style.storeInfo}>
        <div className={style.storeImg}>
          <div>""</div>
        </div>
        <div className={style.title}>
          <h4>공대김밥</h4>
          <p>가성비 최고, 든든한 김밥 전문점</p>
          <div className={style.info}>
            <p>영업중</p>
            <p>리뷰 수</p>
            <p>3.3</p>
          </div>
        </div>
      </div>
      <div className={style.menuImg}>
        <div>이미지1</div>
        <div>이미지1</div>
        <div>이미지1</div>
      </div>
    </div>
  );
};

export default StoreItem;
