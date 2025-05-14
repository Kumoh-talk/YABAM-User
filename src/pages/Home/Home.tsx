import style from "./Home.module.css";
import StoreItem from "../../components/StoreItem/StoreItem";

const Home = () => {
  return (
    <>
      <main className={style.scrollArea}>
        <nav className={style.nav}>
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
