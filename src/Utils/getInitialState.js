export const getAdminInitialState = (body = {}) => {
  
  return {
    accessToken: body.accessToken ?? "",
    isLogin: body.isLogin ?? false,
    userName: body.userName ?? "",
    adminId: body.adminId ?? "",
   };

}
  
  export const getLotteryGameInitialState = (overrides = {}) => ({
    gameId: null,
    gameName: '',
    participants: [],
    ...overrides,
  });
  