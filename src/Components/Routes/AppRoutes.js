import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import LotteryMarkets from "../Markets/LotteryMarkets";
import Login from "../Pages/Login/Login";
import { AppProvider } from "../../contextApi/context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PurchasedLotteries from "../Pages/PurchasedTickets/PurchasedLotteries";
import DashBoard from "../Pages/Dashboard/dashBoard";

const AppRoutes = () => {
  return (
    <AppProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />

          <Route path="/" element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/lottery-markets" element={<LotteryMarkets />} />
            <Route path="/Purchased-tickets" element={<PurchasedLotteries />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default AppRoutes;
