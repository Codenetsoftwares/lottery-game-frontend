export const getUserInitialState = (overrides = {}) => ({
    isLogin: false,
    userId: null,
    ...overrides,
  });
  
  export const getLotteryGameInitialState = (overrides = {}) => ({
    gameId: null,
    gameName: '',
    participants: [],
    ...overrides,
  });
  