import MenuItem from "../../components/MenuItem/MenuItem";
import StoreInfo from "../../components/StoreInfo/StoreInfo";
import style from "./StoreDetail.module.css";

const StoreDetail = () => {
  return (
    <div className={style.storeDetail}>
      <div className={style.img}>이미지</div>
      <StoreInfo />
      <div className={style.menuBar}>
        <ul>
          <li>메뉴</li>
          <li>리뷰</li>
          <li>위치보기</li>
        </ul>
      </div>
      <div className={style.menuList}>
        <div className={style.menuCategory}>
          <h3>추천 메뉴</h3>
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
        <div className={style.menuCategory}>
          <h3>한식</h3>
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
        <div className={style.menuCategory}>
          <h3>두식ㅋㅋ</h3>
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
