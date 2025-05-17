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
import NaverMap from "../../components/NaverMap/NaverMap";

const StoreDetail = () => {
  const location = useLocation();
  const storeId = location.state?.storeId;
  const [storeInfo, setStoreInfo] = useState<StoreResponse>();
  const [imgSlide, setImgSlide] = useState<string[]>([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [isSelectedMap, setSelectedMap] = useState(false);
  const length = imgSlide.length;

  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

  const [selectedMenuBar, setSelectedMenuBar] = useState<"menu" | "map">(
    "menu"
  );

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
      setImgSlide(info?.detailImageUrls);
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
      <div>
        <StoreInfo storeInfo={storeInfo} />
      </div>
      <div className={style.menuBar}>
        <button
          className={`${style.button} ${
            selectedMenuBar === "menu" ? style.selected : ""
          }`}
          onClick={() => setSelectedMenuBar("menu")}
        >
          메뉴
        </button>
        <button
          className={`${style.button} ${
            selectedMenuBar === "map" ? style.selected : ""
          }`}
          onClick={() => setSelectedMenuBar("map")}
        >
          위치보기
        </button>
      </div>
      <div className={style.selectedInfo}>
        {storeInfo ? (
          <>
            {selectedMenuBar === "map" ? (
              <div className={style.naverMap}>
                <NaverMap latitude={36.146} longitude={128.3933} />
              </div>
            ) : (
              <Menu storeId={storeInfo.storeId} />
            )}
          </>
        ) : (
          <Loading
            msg={`${
              selectedMenuBar === "map" ? "가게 위치" : "가게 메뉴"
            } 정보를 불러오지 못했습니다.`}
          />
        )}
      </div>
    </div>
  );
};

export default StoreDetail;
