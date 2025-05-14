import style from "./QRscan.module.css";
import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header/Header";

const QRscan = () => {
  return (
    <div className={style.qrScan}>
      <header>
        <Header title="주문하기" />
      </header>
      <main>
        <h3>테이블에 있는 QR코드를 인식해주세요</h3>
        <p>QR코드를 인식하면 주문이 시작됩니다</p>
        <div className={style.button}>메뉴 목록보기 (디버깅 모드)</div>
        <div className={style.camera}>카메라</div>
      </main>
      <footer>
        <BottomNav />
      </footer>
    </div>
  );
};

export default QRscan;
