import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import LotteryMarkets from "../Markets/LotteryMarkets";
import Login from "../Pages/Login/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />

        <Route path="/" element={<AdminLayout />}>
          <Route path="/lottery-markets" element={<LotteryMarkets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
