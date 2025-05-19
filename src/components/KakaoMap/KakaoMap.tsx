import { useEffect } from "react";
import style from "./KakaoMap.module.css";

type LocationType = {
  latitude: number;
  longitude: number;
};

const KakaoMap = ({ latitude, longitude }: LocationType) => {
  useEffect(() => {
    const { kakao } = window;
    if (!kakao) return;

    const container = document.getElementById("kakaoMap");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
      map: map,
    });

    return () => {
      marker.setMap(null);
    };
  }, [latitude, longitude]);

  return <div id="kakaoMap" className={style.map} />;
};

export default KakaoMap;
