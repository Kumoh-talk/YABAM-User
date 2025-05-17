import { useEffect } from "react";
import style from "./NaverMap.module.css";
type LocationType = {
  latitude: number;
  longitude: number;
};

const NaverMap = ({ latitude, longitude }: LocationType) => {
  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 18,
    };

    const map = new naver.maps.Map("naverMap", mapOptions);

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: map,
    });

    return () => marker.setMap(null);
  }, [latitude, longitude]);

  return <div id="naverMap" className={style.map} />;
};

export default NaverMap;
