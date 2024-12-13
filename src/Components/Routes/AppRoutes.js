import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import LotteryMarkets from '../Markets/LotteryMarkets';
import Login from '../Pages/Login/Login';
import { AppProvider } from '../../contextApi/context';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PurchasedLotteries from '../Pages/PurchasedTickets/PurchasedLotteries';
import DashBoard from '../Pages/Dashboard/dashBoard';
import NotFound from '../Common/NotFound';
import CreateMarket from '../CreateLottery/CreateMarket';
import Result from '../Result/Result';
import Win from '../Win/Win';
import PurchasedTickets from '../Pages/PurchasedTickets/PurchasedTickets';
import Search from '../Search/Search';
import CreateTime from '../CreateDrawTime/CreateTime';
import MarketInsight from '../MarketOverview/MarketInsight';
import SearchLottery from '../Pages/SearchLotteryPage/SearchLottery';
import PrivateRoute from '../Common/privateRouting';
import DemoResult from '../Result/demoResult';

import CreateMarkets from '../CreateLottery/CreateMarkets';
import AlphabetForm from '../ReusableInput/AlphabetForm';

import Void from '../Void/Void';
import Inactive from '../Pages/Inactive';


const AppRoutes = () => {
  return (
    <AppProvider>
      <ToastContainer
        position="top-center"
        autoClose={500}
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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            {/* <Route path="/lottery-markets" element={<LotteryMarkets />} /> old create not in use anymore */}
            <Route path="/lottery-markets" element={<CreateMarket/>} />
            <Route path="/Newlottery-markets" element={<CreateMarkets/>} />
            <Route path="/Debounce-demo" element={<AlphabetForm/>} />
            
            {/* <Route path="/Purchased-tickets" element={<PurchasedLotteries />} />  old purchased component not in use anymore */}
            <Route path="/purchase-history/:marketId" element={<PurchasedTickets />}/>
            <Route path="/purchase-history" element={<PurchasedTickets />}/>
            <Route path="/results/:marketId" element={<Result />} />
            <Route path="/results" element={<Result />} />
            {/* <Route path="/results" element={<DemoResult />} /> */}
            <Route path="/win" element={<Win />} />
            <Route path="/search-lottery" element={<SearchLottery/>} />
            <Route path="/get-void-market" element={<Void/>} />
            <Route path="/void-market-lottery" element={<Void/>} />
            <Route path="/inactive" element={<Inactive/>} />

            {/* <Route path="/lucky-hour" element={<CreateTime/>}/>  not in use anymore  */} 
            <Route path="/Market-overview" element={<MarketInsight/>} />
          </Route>
          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};
export default AppRoutes;