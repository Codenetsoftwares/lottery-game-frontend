import { createContext, useContext, useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import { getAdminInitialState } from "../Utils/getInitialState";
import strings from "../Utils/constant/stringConstant";

const AppContext = createContext();

const initialState = {
  user: getAdminInitialState(),
};

const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState, () => {
    // Load state from local storage if available
    const storedState = localStorage.getItem(strings.LOCAL_STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : initialState;
  });

  useEffect(() => {
    const saveState = { ...store };
    localStorage.setItem(strings.LOCAL_STORAGE_KEY, JSON.stringify(saveState));
  }, [store]);

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
