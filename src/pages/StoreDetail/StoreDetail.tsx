import StoreInfo from "../../components/StoreInfo/StoreInfo";
import style from "./StoreDetail.module.css";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { StoreResponse } from "../../types/Store";
import { getStoreId } from "../../api/store";
import Menu from "../Menu/Menu";

const StoreDetail = () => {
  const location = useLocation();
  const storeId = location.state;
  const [storeInfo, setStoreInfo] = useState<StoreResponse>();
  const [imgSlide, setImgSlide] = useState(["이미지"]);

  const [currentImg, setCurrentImg] = useState(0);
  const length = imgSlide.length;

  const nextSlide = () => {
    setCurrentImg(currentImg === length - 1 ? 0 : currentImg + 1);
  };

  const prevSlide = () => {
    setCurrentImg(currentImg === 0 ? length - 1 : currentImg - 1);
  };

  const fetchStoreId = async () => {
    try {
      console.log(storeId);
      const info = await getStoreId(storeId); //여기 메소드 이름 바꿔야할 듯
      console.log("간당당", info);
      setStoreInfo(info);
      setImgSlide(
        storeInfo?.detailImageUrls === undefined
          ? ["이미지"]
          : storeInfo?.detailImageUrls
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchStoreId();
    console.log("야호", imgSlide);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [currentImg, length]);

  return (
    <div className={style.storeDetail}>
      <div className={style.scrollImg}>
        <RxDoubleArrowLeft onClick={prevSlide} />
        {imgSlide.map((slide, index) => {
          return (
            <img
              className={
                index === currentImg ? style.slide_active : style.slide
              }
              key={index}
              src={slide}
            ></img>
          );
        })}

        <RxDoubleArrowRight onClick={nextSlide} />
      </div>
      <div className={style.storeInfo}>
        <StoreInfo storeInfo={storeInfo} />
      </div>
      <div className={style.menuList}>
        <div className={style.menuCategory} />
        {storeInfo ? (
          <Menu storeId={storeInfo.storeId} />
        ) : (
          <div>가게 메뉴 정보를 불러오지 못했습니다.</div>
        )}
      </div>
    </div>
  );
};

export default StoreDetail;
