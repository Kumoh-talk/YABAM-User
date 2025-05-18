import style from "./Home.module.css";
import StoreItem from "../../components/StoreItem/StoreItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoreList } from "../../api/store";
import type { storeInfoDtos, StoreListResponse } from "../../types/Store";

const Home = () => {
  const [size] = useState(10); // 한 번에 가져올 데이터 개수
  const [lastStoreId, setLastStoreId] = useState<null | number>(null); // 마지막 가게 ID
  const [data, setData] = useState<storeInfoDtos[]>([]); // 가게 데이터 리스트
  const [hasNextPage, setHasNextPage] = useState(true); // 다음 페이지 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const fetchStoreData = async () => {
    if (isLoading || !hasNextPage) return; // 이미 로딩 중이거나 다음 페이지가 없으면 중단

    setIsLoading(true);
    try {
      const response: StoreListResponse = await getStoreList(lastStoreId, size);

      // 데이터 누적 및 상태 업데이트
      setData((prevData) => [...prevData, ...response.storeInfoDtos]);
      setLastStoreId(response.lastStoreId);
      setHasNextPage(response.hasNextPage);
    } catch (e) {
      console.error("Failed to fetch store data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData(); // 초기 데이터 로드
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isLoading
      ) {
        fetchStoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasNextPage]);

  return (
    <div>
      {/* 타이틀 영역 */}
      <header className={style.header}>
        <img
          src="https://kumoh-talk-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250519_021541789.png"
          alt="축제 로고"
          className={style.logo}
        />
        <h1 className={style.title}>금오공대 축제 주막 정보</h1>
      </header>

      {/* 가게 리스트 */}
      <div className={style.scrollArea}>
        {data.map((store) => (
          <Link
            to={"/storeDetail"}
            key={store.storeId}
            state={{ storeId: store.storeId }}
          >
            <StoreItem
              storeName={store.storeName}
              isOpened={store.isOpened}
              headImageUrl={store.headImageUrl}
              description={store.description}
              storeInfoImageUrl={store.storeDetailImageUrls || []}
            />
          </Link>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
