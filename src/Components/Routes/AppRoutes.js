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
import NotFound from "../Common/NotFound";
import CreateMarket from "../CreateLottery/CreateMarket";
import Result from "../Result/Result";
import Win from "../Win/Win";
import PurchasedTickets from "../Pages/PurchasedTickets/PurchasedTickets";
import Search from "../Search/Search";

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
            {/* <Route path="/lottery-markets" element={<LotteryMarkets />} /> old create not in use anymore */}
            <Route path="/lottery-markets" element={<CreateMarket />} />
            {/* <Route path="/Purchased-tickets" element={<PurchasedLotteries />} />  old purchased component not in use anymore */}
            <Route path="/purchase-history" element={<PurchasedTickets />} />
            <Route path="/results" element={<Result />} />
            <Route path="/win" element={<Win />} />
            <Route path="/search-lottery" element={<Search />} />
          </Route>
            {/* not found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default AppRoutes;
