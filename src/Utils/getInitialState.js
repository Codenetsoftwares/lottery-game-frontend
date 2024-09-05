export const getAdminInitialState = (body = {}) => {
  
  return {
    accessToken: body.accessToken ?? "",
    isLogin: !!body.accessToken, // Determine login status based on accessToken
    userName: body.userName ?? "",
    adminId: body.adminId ?? "",
    roles: body.role ?? [],
   };

}
  

export const getLotteryMarketsInitialState = (body = {}) => {
  return {
    currentPage: body.currentPage ?? 1,
    totalPages: body.totalPages ?? 10,
    entries: body.entries ?? 10,
    randomToken: body.randomToken ?? "",
    lotteryCards: body.lotteryCards ?? [],
    sem: body.sem ?? 5,
    lotteryId: body.lotteryId ?? "",
    price: body.price ?? 6,
    isModalOpen: body.isModalOpen ?? false,
     inputs: body.inputs ?? {
      name:"",
      DateTime: "",
      firstPrize: "",
      sem: "",
      price: ""
    },
    showModal: body.showModal ?? false
  };
};
