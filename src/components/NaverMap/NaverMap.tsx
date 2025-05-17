import { useEffect, useRef, useState } from "react";

const NaverMap = () => {
  const { naver } = window;
  const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
  };
  const map = new naver.maps.Map("map", mapOptions);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
  //   const mapRef = useRef(null);
  //   const [currentLocation, setCurrentLocation] = useState({
  //     latitude: 37.123456,
  //     longitude: 127.123456,
  //   });

  //   const success = () => {
  //     setCurrentLocation({
  //       latitude: 37.123456,
  //       longitude: 127.123456,
  //     });
  //   };

  //   const error = () => {
  //     setCurrentLocation({
  //       latitude: 37.123456,
  //       longitude: 127.123456,
  //     });
  //   };

  //   //   let map: naver.maps.Map;
  //   //   const center: naver.maps.LatLng = new naver.maps.LatLng(
  //   //     37.3595704,
  //   //     127.105399
  //   //   );

  //   //   map = new naver.maps.Map("map", {
  //   //     center: center,
  //   //     zoom: 16,
  //   //   });

  //   //   useEffect(() => {
  //   //     const mapOptions = {
  //   //       center: new naver.maps.LatLng(37.511337, 127.012084),
  //   //       logoControl: false,
  //   //       tileDuration: 200,
  //   //       zoom: 10,
  //   //     };
  //   //     mapRef.current = new naver.maps.Map("map", mapOptions);
  //   //   }, []);
  //   const map = new naver.maps.Map("map", {
  //     center: new naver.maps.LatLng(37.3595704, 127.105399),
  //     zoom: 15,
  //   });

  //   const marker = new naver.maps.Marker({
  //     position: new naver.maps.LatLng(37.3595704, 127.105399),
  //     map: map,
  //   });

  //   return <div id="map"></div>;
};

export default NaverMap;
