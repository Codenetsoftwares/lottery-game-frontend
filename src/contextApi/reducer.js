import strings from '../utils/constant/stringConstant';
import { getUserInitialState, getLotteryGameInitialState } from '../utils/getInitiateState';

export const reducer = (state, action) => {
  switch (action.type) {
    case strings.LOG_IN:
      return {
        ...state,
        user: getUserInitialState(action.payload),
      };

    case strings.LOG_OUT:
      return {
        ...state,
        user: getUserInitialState({ isLogin: false }),
      };

    // case strings.SET_LOTTERY_GAMES:
    //   return {
    //     ...state,
    //     lotteryGames: action.payload,
    //   };

    // case strings.SET_CURRENT_GAME:
    //   return {
    //     ...state,
    //     currentGame: getLotteryGameInitialState(action.payload),
    //   };

    // case strings.SET_LOADING:
    //   return {
    //     ...state,
    //     isLoading: action.payload,
    //   };

    default:
      return state;
  }
};
