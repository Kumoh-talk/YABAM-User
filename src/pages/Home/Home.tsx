import style from "./Home.module.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header/Header";
import StoreItem from "../../components/StoreItem/StoreItem";

const Home = () => {
  return (
    <>
      <header>
        <Header title="내 주변 주막" />
      </header>
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
      <footer>
        <BottomNav />
      </footer>
    </>
  );
};

export default Home;
