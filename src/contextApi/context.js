import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { reducer } from "./reducer";
import { getAdminInitialState } from "../Utils/getInitialState";
import strings from "../Utils/constant/stringConstant";

const AppContext = createContext();

const initialState = {
  admin: getAdminInitialState(),
};

const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState, () => {
    // Load state from local storage if available
    const storedState = localStorage.getItem(strings.LOCAL_STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : initialState;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (store.admin.accessToken) {
      // Save state to local storage if the user is logged in
      localStorage.setItem(strings.LOCAL_STORAGE_KEY, JSON.stringify(store));
      setLoading(false);
    } else {
      // Remove state from local storage when logged out
      localStorage.removeItem(strings.LOCAL_STORAGE_KEY);
      setLoading(false);
    }
  }, [store]);
  if (loading) {
    return <div>Loading...</div>; // Show a loading state until the state is ready
  }

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
