import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { reducer } from './reducer';
import { getAdminInitialState } from '../Utils/getInitialState';
import strings from '../Utils/constant/stringConstant';
import './loader.css';


const Loader = () => (
  <div className="loader">
    <div className="spinner"></div>
  </div>
);

const AppContext = createContext({
  store: {},
  dispatch: () => {},
  showLoader: () => {},
  hideLoader: () => {},
});

const initialState = {
  admin: getAdminInitialState(),
};

const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState, () => {
    const storedState = localStorage.getItem(strings.LOCAL_STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : initialState;
  });

  // const [loading, setLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  useEffect(() => {
    if (store.admin.accessToken) {
      // Save state to local storage if the user is logged in
      localStorage.setItem(strings.LOCAL_STORAGE_KEY, JSON.stringify(store));
      setIsLoading(false);
    } else {
      // Remove state from local storage when logged out
      localStorage.removeItem(strings.LOCAL_STORAGE_KEY);
      setIsLoading(false);
    }
  }, [store]);

  // if (loading) {
  //   return <div>Loading...</div>; 
  // }
  

  return <AppContext.Provider value={{ store, dispatch, isLoading, showLoader, hideLoader}}>{children} {isLoading && (
    <Loader />
  )} </AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
