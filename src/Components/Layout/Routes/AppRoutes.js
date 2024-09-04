import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import LotteryMarkets from "../Markets/LotteryMarkets";
import Login from "../Pages/Login/Login";
import { AppProvider } from "../../../contextApi/context";

const AppRoutes = () => {
  return (
    <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
         <Route path="/" element={<AdminLayout/>}>
          <Route path="/lottery-markets" element={<LotteryMarkets />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AppProvider>
  );
};

export default AppRoutes;
