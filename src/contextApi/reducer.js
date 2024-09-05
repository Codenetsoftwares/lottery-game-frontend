import strings from "../Utils/constant/stringConstant";
import { getAdminInitialState } from "../Utils/getInitialState";


export const reducer = (state, action) => {
  switch (action.type) {
    case strings.LOG_IN:
      return {
        ...state,
        admin: getAdminInitialState(action.payload),
      };

    case strings.LOG_OUT:
      return {
        ...state,
        admin: getAdminInitialState(), // Clear admin data on logout
      };

      case strings.GENERATE_TICKET_NUMBER:
        return {
          ...state,
          ticketNumber: action.payload, // Save the ticket number in the state
        };

        
      case strings.GENERATE_LOTTERY:
        return {
          ...state,
          lotteryTicket: action.payload, // Save the  lottery ticket  in the state
        };

    default:
      return state;
  }
};
