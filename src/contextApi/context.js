import { createContext, useContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';
import strings from '../utils/constant/stringConstant';
import { getUserInitialState, getLotteryGameInitialState } from '../utils/getInitiateState';

const LotteryContext = createContext();

const initialState = {
  user: getUserInitialState(),
  lotteryGames: [],
  currentGame: getLotteryGameInitialState(),
  isLoading: false,
};

const LotteryProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState, () => {
    const storedState = localStorage.getItem(strings.LOCAL_STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : initialState;
  });

  useEffect(() => {
    const saveState = { ...store };
    localStorage.setItem(strings.LOCAL_STORAGE_KEY, JSON.stringify(saveState));
  }, [store]);

  return (
    <LotteryContext.Provider value={{ store, dispatch }}>
      {children}
    </LotteryContext.Provider>
  );
};

const useLotteryContext = () => {
  return useContext(LotteryContext);
};

export { LotteryProvider, useLotteryContext };
