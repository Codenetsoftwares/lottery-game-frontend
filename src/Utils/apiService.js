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

export async function SearchLotteryTicket(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.searchTicket, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function PurchasedTicketsHistory(body, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, null, isToast);
    const response = await makeCall(
      `${urls.PurchasedLotteryHistory}?page=${body.page}&limitPerPage=${body.limit}&sem=${body.searchBySem}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function CreateDrawTime(body, isToast = true) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.lotteryClock, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}
