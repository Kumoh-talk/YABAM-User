import style from "./Home.module.css";
import StoreItem from "../../components/StoreItem/StoreItem";

const Home = () => {
  return (
    <div className={style.scrollArea}>
      <StoreItem />
      <StoreItem />
      <StoreItem />
      <StoreItem />
      <StoreItem />
      <StoreItem />
    </div>
  );
};

export default Home;
