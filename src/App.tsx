import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";
import StoreDetail from "./pages/StoreDetail/StoreDetail";
import Loading from "./components/Loading/Loading";

const TableValidationPage = lazy(
  () => import("./pages/TableValidationPage/TableValidationPage")
);
const OrderMenu = lazy(() => import("./pages/OrderMenu/OrderMenu"));
const OrderMenuDetail = lazy(
  () => import("./pages/OrderMenuDetail/OrderMenuDetail")
);
const OrderCart = lazy(() => import("./pages/OrderCart/OrderCart"));
const OrderStatus = lazy(() => import("./pages/OrderStatus/OrderStatus"));

function App() {
  function setScreenSize(): void {
    const vh: number = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });

  return (
    <Suspense fallback={<Loading msg="로딩중..." />}>
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
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </Suspense>
  );
}

export default App;
