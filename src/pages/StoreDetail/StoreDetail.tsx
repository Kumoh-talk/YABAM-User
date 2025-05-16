import StoreInfo from "../../components/StoreInfo/StoreInfo";
import style from "./StoreDetail.module.css";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { StoreResponse } from "../../types/Store";
import { getStoreInfo } from "../../api/store";
import Menu from "../Menu/Menu";

const StoreDetail = () => {
  const location = useLocation();
  const storeId = location.state;
  const [storeInfo, setStoreInfo] = useState<StoreResponse>();
  const [imgSlide, setImgSlide] = useState<string[]>(["이미지"]);
  const [currentImg, setCurrentImg] = useState(0);
  const length = imgSlide.length;

  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentImg(currentImg === length - 1 ? 0 : currentImg + 1);
  };

  const prevSlide = () => {
    setCurrentImg(currentImg === 0 ? length - 1 : currentImg - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX !== null && endX !== null) {
      const diff = startX - endX;

      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }

    setStartX(null);
    setEndX(null);
  };

  const fetchStoreId = async () => {
    try {
      const info = await getStoreInfo(storeId);
      setStoreInfo(info);
      setImgSlide(info?.detailImageUrls || ["이미지"]);
    } catch (e) {
      console.error("가게 정보를 불러오는 데 실패했습니다:", e);
    }
  };

  useEffect(() => {
    fetchStoreId();
  }, [storeId]);

  return (
    <div className={style.storeDetail}>
      {/* 이미지 슬라이드 */}
      <div
        className={style.scrollImg}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <RxDoubleArrowLeft onClick={prevSlide} />
        {imgSlide.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`가게 이미지 ${index + 1}`}
            style={{ display: index === currentImg ? "block" : "none" }}
          />
        ))}
        <RxDoubleArrowRight onClick={nextSlide} />
      </div>

      {/* 가게 정보 */}
      <div className={style.storeInfo}>
        <StoreInfo storeInfo={storeInfo} />
      </div>

      {/* 메뉴 리스트 */}
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
