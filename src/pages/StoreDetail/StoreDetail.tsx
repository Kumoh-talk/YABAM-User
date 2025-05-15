import MenuItem from "../../components/MenuItem/MenuItem";
import StoreInfo from "../../components/StoreInfo/StoreInfo";
import style from "./StoreDetail.module.css";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";
import { useEffect, useState } from "react";

const StoreDetail = () => {
  const imgSlide = ["1", "2", "3", "4", "5"];

  const [currentImg, setCurrentImg] = useState(0);
  const length = imgSlide.length;

  const nextSlide = () => {
    setCurrentImg(currentImg === length - 1 ? 0 : currentImg + 1);
  };

  const prevSlide = () => {
    setCurrentImg(currentImg === 0 ? length - 1 : currentImg - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImg, length]);

  if (!Array.isArray(imgSlide) || imgSlide.length <= 0) {
    return null;
  }

  return (
    <div className={style.storeDetail}>
      <div className={style.scrollImg}>
        <RxDoubleArrowLeft onClick={prevSlide} />
        <div>
          {imgSlide.map((slide, index) => (
            <div key={index}>{index === currentImg && <h1>{slide}</h1>}</div>
          ))}
        </div>
        <RxDoubleArrowRight onClick={nextSlide} />
      </div>

      <div className={style.storeInfo}>
        <StoreInfo />
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
