import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import StoreDetail from "./pages/StoreDetail/StoreDetail";
// import QRscan from "./pages/QRscan/QRscan";
import OrderMenu from "./pages/OrderMenu/OrderMenu";
import OrderMenuItem from "./pages/OrderMenuItem/OrderMenuItem";
import CallStaffModal from "./components/CallStaffModal/CallStaffModal";

function App() {
  function setScreenSize(): void {
    const vh: number = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storeDetail" element={<StoreDetail />} />
        <Route path="/orderMenu" element={<OrderMenu />} />
        <Route path="/orderMenuItem" element={<OrderMenuItem />} />
        <Route path="/callStaff" element={<CallStaffModal />} />
      </Routes>
      {/* 장바구니 화면 & 주문현황 화면 - 1초마다 get 날리기 */}
    </div>
  );
}

export default App;
