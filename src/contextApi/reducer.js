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

    default:
      return state;
  }
};
