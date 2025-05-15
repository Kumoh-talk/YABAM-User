import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import StoreDetail from "./pages/StoreDetail/StoreDetail";
import TableValidationPage from "./pages/TableValidationPage/TableValidationPage";
import OrderMenu from "./pages/OrderMenu/OrderMenu";
import OrderMenuDetail from "./pages/OrderMenuDetail/OrderMenuDetail";
import OrderCart from "./pages/OrderCart/OrderCart";
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import { ToastContainer } from 'react-toastify';

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
        <Route path="/validate-table" element={<TableValidationPage />} />
        <Route path="/orderMenu" element={<OrderMenu />} />
        <Route path="/orderMenuDetail" element={<OrderMenuDetail />} />
        <Route path="/orderCart" element={<OrderCart />} />
        <Route path="/orderStatus" element={<OrderStatus />} />
      </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      {/* 장바구니 화면 & 주문현황 화면 - 1초마다 get 날리기 */}
    </div>
  );
}

export default App;
