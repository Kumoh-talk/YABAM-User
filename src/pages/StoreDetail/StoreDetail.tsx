import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import StoreInfo from "../../components/StoreInfo/StoreInfo";
import style from "./StoreDetail.module.css";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
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
  const [swiper, setSwiper] = useState<SwiperClass>();

  const [selectedMenuBar, setSelectedMenuBar] = useState<"menu" | "map">(
    "menu",
  );

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

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  useEffect(() => {
    fetchStoreInfo();
  }, [storeId]);

  return (
    <div className={style.storeDetail}>
      {imgSlide.length > 0 ? (
        <div className={style.scrollImgWrapper}>
          <Swiper
            className={style.scrollImg}
            modules={[Pagination]}
            slidesPerView={1}
            loop
            pagination
            navigation={{
              prevEl: ".prevImg",
              nextEl: ".nextImg",
            }}
            onSwiper={(e) => {
              setSwiper(e);
            }}
          >
            {imgSlide.map((slide, index) => (
              <SwiperSlide>
                <img key={index} src={slide} alt={`가게 이미지 ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
          {imgSlide.length > 1 && (
            <>
              <RxDoubleArrowLeft
                className={`${style.scrollImgButton} ${style.left}`}
                onClick={handlePrev}
              />
              <RxDoubleArrowRight
                className={`${style.scrollImgButton} ${style.right}`}
                onClick={handleNext}
              />
            </>
          )}
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
                {storeInfo.latitude && storeInfo.longitude ? (
                  <NaverMap
                    latitude={storeInfo.latitude}
                    longitude={storeInfo.longitude}
                  />
                ) : (
                  <div>가게 위치 정보가 없습니다.</div>
                )}
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