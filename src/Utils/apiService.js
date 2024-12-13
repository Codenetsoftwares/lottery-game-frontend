import strings from "./constant/stringConstant";
import { getAuthCallParams, getNoAuthCallParams, makeCall } from "./service";
import urls from "./UrlConstant";

// Admin login
export async function adminLogin(body, isToast = true) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body);
    const response = await makeCall(urls.login, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function generateTicketNumber(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.generateTicketId, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function generateLotteryTicket(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.generateLottery, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getLotteryTickets(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.GET, null, isToast);
    const response = await makeCall(
      `${urls.getLotteryTicket}?page=${body.page}&limitPerPage=${body.limit}&totalPages=${body.totalPages}&totalData=${body.totalItems}&Sem=${body.sem}`,

      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getPurchasedLotteryTickets(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.GET, null, isToast);
    const response = await makeCall(
      `${urls.getPurchasedLotteryTicket}?page=${body.page}&limitPerPage=${body.limit}&totalPages=${body.totalPages}&totalData=${body.totalItems}&Sem=${body.searchBySem}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
    // console.log(error)
  }
}

export async function CreatedLotteryTicketsDelete(isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.DELETE, null, isToast);
    const response = await makeCall(
      urls.removeCreatedLottery,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// not in use anymore
export async function PurchasedLotteryTicketsDelete(isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.DELETE, null, isToast);
    const response = await makeCall(
      urls.deletePurchasedLottery,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function unPurchasedLotteryTicketsDelete(isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.DELETE, null, isToast);
    const response = await makeCall(
      urls.UnPurchasedLotteryDelete,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSelectSemInModal(sem, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.GET, null, isToast);
    const response = await makeCall(
      `${urls.getSelectSem}/${sem}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function singleLotteryDelete(lotteryId, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.DELETE, null, isToast);
    const response = await makeCall(
      `${urls.SingleDeleteCard}/${lotteryId}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function singleLotteryEdit(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.PUT, body);
    const response = await makeCall(
      `${urls.SingleEditCard}/${body.lotteryId}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function generateLotteryNumber(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.generateNumber, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function SearchLotteryTicket(body) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body);
    const response = await makeCall(urls.searchTicket, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function PurchasedTicketsHistory(body, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, null, isToast);
    let url = `${urls.PurchasedLotteryHistory}/${body.marketId}?page=${body.page}&limitPerPage=${body.limit}`
    if (body.searchBySem) {
      url = url + `&sem=${body.searchBySem}`

    }
    // console.log("search lottery", url);
    const response = await makeCall(
      url,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// export async function lotteryPurchaseHIstoryUserNew(body = {}, isToast = false) {
//   try {
//     const callParams = await getAuthCallParams(strings.GET, body, isToast); // Using POST method with `body`
//     const response = await makeCall(
//       `${urls.userPurchaseHIstory}?page=${body.page}&limitPerPage=${body.limit}&searchTerm=${body.searchTerm}`, // Constructing URL with pagination and search term
//       callParams,
//       isToast
//     );
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }


export async function CreateDrawTime(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.lotteryClock, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetDrawTime(body, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.GetScheduleTime, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function CustomWining(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body.resultArray, isToast);
    const response = await makeCall(`${urls.CustomWinningPrize}/${body.marketId}`, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetWiningResult(body) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body);
    const response = await makeCall(
      `${urls.GetResult}/${body.marketId}`,
      callParams);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function LotteryRange(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.lotteryRange, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function AllActiveLotteryMarkets(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.allActiveLotteryMarket, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetMarketTimings(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.getMarketTime, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetPurchaseOverview(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.getPurchaseDetails}/${body.marketId}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function GetResultMarket(body = {}) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body);
    const response = await makeCall(
      `${urls.getResultMarkets}?date=${body.date}`,
      callParams,

    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function GetPurchaseHistoryMarketTimings(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.getPurchaseMarketTime, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function isActiveLottery(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.isActive, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getIsActiveLottery(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(`${urls.getIsActive}?page=${body.page}&limitPerPage=${body.limit}`, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function isRevokeLottery(body = {}, isToast = false) {
  console.log("first",body)
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.isRevoke, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function voidMarket(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.getVoidMarket, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function GetVoidMarketData(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.allVoidMarketData}?page=${body.page}&limit=${body.limit}&searchByMarketName=${body.searchTerm}`,
      callParams,
    );
    return response;
  } catch (error) {
    throw error;
  }
}
