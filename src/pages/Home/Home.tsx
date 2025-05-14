import style from "./Home.module.css";
import StoreItem from "../../components/StoreItem/StoreItem";

const Home = () => {
  return (
    <>
      <main className={style.home}>
        <nav className={style.contents}>
          <StoreItem />
          <StoreItem />
          <StoreItem />
          <StoreItem />
          <StoreItem />
          <StoreItem />
        </nav>
      </main>
    </>
  );
};

export default Home;
