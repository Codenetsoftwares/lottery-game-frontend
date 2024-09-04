
import strings from "./constant/stringConstant";


import { getNoAuthCallParams, makeCall } from "./service";
import urls from "./UrlConstant";

// User login
export async function adminLogin(body, isToast = true) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.login, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function generateTicketNumber(body, isToast = true) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.generateTicketId, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}



