import style from "./Home.module.css";
import StoreItem from "../../components/StoreItem/StoreItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getStoreList } from "../../api/store";
import type { storeInfoDtos, StoreListResponse } from "../../types/Store";

const Home = () => {
  const [size, setSize] = useState(10);
  const [lastStoreId, setStoreId] = useState<null | number>(null);
  const [data, setData] = useState<storeInfoDtos[] | undefined | []>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const storeList: storeInfoDtos[] | undefined = await getStoreList(
          lastStoreId,
          size
        );
        setData(storeList);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStoreData();
  }, []);

  // useEffect(() => {
  //   const fetchStoreData = async () => {
  //     const response = await axios("");
  //     setData((prevData) => [...prevData, ...response]);
  //   };
  // }, [page]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className={style.scrollArea}>
      <Link to="/storeDetail">
        <StoreItem />
      </Link>

      <StoreItem />
      <StoreItem />
      <StoreItem />
      <StoreItem />
      <StoreItem />
    </div>
  );
};

export default Home;
