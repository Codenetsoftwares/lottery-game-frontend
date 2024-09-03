
import strings from "./constant/stringConstant";


import { getCallParams, getNoAuthCallParams, makeCall } from "./service";
import urls from "./UrlConstant";

// User login
export async function adminLogin(body, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.login, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

// User logout
export async function logout(body, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.userLogout, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}


