import urls from "../utils/constant/UrlConstant";
import strings from "../utils/constant/stringConstant";
import { getCallParams, getNoAuthCallParams, makeCall } from "./service";

// User login
export async function login(body, isToast = false) {
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

// Get all lottery games
// export async function getAllLotteryGames(isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, {}, isToast);
//     const response = await makeCall(urls.getAllLotteryGames, callParams, isToast);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// Get details of a specific lottery game
// export async function getLotteryGameDetails(gameId, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, {}, isToast);
//     const response = await makeCall(`${urls.getLotteryGameDetails}/${gameId}`, callParams, isToast);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// Place a bet on a lottery game
// export async function placeLotteryBet(body, isToast = false) {
//   try {
//     const callParams = getCallParams(strings.POST, body, isToast);
//     const response = await makeCall(urls.placeLotteryBet, callParams, isToast);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }
