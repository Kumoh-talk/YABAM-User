import StoreInfo from "../../components/StoreInfo/StoreInfo";
import style from "./StoreDetail.module.css";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { StoreResponse } from "../../types/Store";
import { getStoreInfo } from "../../api/store";
import Menu from "../Menu/Menu";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const StoreDetail = () => {
  const location = useLocation();
  const storeId = location.state?.storeId;
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

  const fetchStoreInfo = async () => {
    try {
      const info = await getStoreInfo(storeId);
      setStoreInfo(info);
      setImgSlide(info?.detailImageUrls || ["이미지"]);
    } catch (e) {
      toast.error("가게 정보를 불러오는 데 실패했습니다");
      console.error("가게 정보를 불러오는 데 실패했습니다:", e);
    }
  };

  useEffect(() => {
    fetchStoreInfo();
  }, [storeId]);

  return (
    <div className={style.storeDetail}>
      {imgSlide.length > 0 ? (
        <div
          className={style.scrollImg}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {imgSlide.length > 1 && <RxDoubleArrowLeft onClick={prevSlide} />}
          {imgSlide.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`가게 이미지 ${index + 1}`}
              className={index === currentImg ? style.visible : style.hidden}
            />
          ))}
          {imgSlide.length > 1 && <RxDoubleArrowRight onClick={nextSlide} />}
        </div>
      ) : (
        <div className={style.noImage}>이미지가 없습니다.</div>
      )}

      <div className={style.storeInfo}>
        <StoreInfo storeInfo={storeInfo} />
      </div>

      <div className={style.menuList}>
        <div className={style.menuCategory} />
        {storeInfo ? (
          <Menu storeId={storeInfo.storeId} />
        ) : (
          <Loading msg="가게 메뉴 정보를 불러오지 못했습니다." />
        )}
      </div>
    </div>
  );
};

export default StoreDetail;
