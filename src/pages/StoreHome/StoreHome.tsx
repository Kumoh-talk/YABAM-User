import { Link } from "react-router-dom";
import style from "./StoreHome.module.css";

const StoreHome = () => {
  return (
    <div className={style.storeHome}>
      <div className={style.content}>
        <Link to="/" className={style.route}>
          앱에서 더 많은 정보를 확인하세요
        </Link>
        <Link to="/orderMenu" className={style.route}>
          괜찮아요, 웹으로 볼래요
        </Link>
      </div>
    </div>
  );
};

export default StoreHome;
