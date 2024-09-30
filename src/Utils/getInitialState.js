export const getAdminInitialState = (body = {}) => {
  return {
    accessToken: body.accessToken ?? "",
    isLogin: !!body.accessToken, // Determine login status based on accessToken
    userName: body.userName ?? "",
    adminId: body.adminId ?? "",
    roles: body.role ?? [],
  };
};

export const getLotteryMarketsInitialState = (body = {}) => {
  return {

    randomToken: body.randomToken ?? "",
    lotteryCards: body.lotteryCards ?? [],
    lotteryId: body.lotteryId ?? "",
    isModalOpen: body.isModalOpen ?? false,
    inputs: body.inputs ?? {
      name: "",
      DateTime: "",
      firstPrize: "",
      sem: " ",
      tickets: [],
      price: "",
    },
    showModal: body.showModal ?? false,
    showTicketModal: body.showTicketModal ?? false,

    // Additional fields integrated
    pagination: {
      page: body.pagination?.page ?? 1,
      limit: body.pagination?.limit ?? 10,
      totalPages: body.pagination?.totalPages ?? 0,
      totalItems: body.pagination?.totalItems ?? 0,
    },
    showDeleteModal: body.showDeleteModal ?? false,
    selectedTicketCount: body.selectedTicketCount ?? 5, 
  };
};


