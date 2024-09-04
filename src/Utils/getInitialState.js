export const getAdminInitialState = (body = {}) => {
  
  return {
    accessToken: body.accessToken ?? "",
    isLogin: !!body.accessToken, // Determine login status based on accessToken
    userName: body.userName ?? "",
    adminId: body.adminId ?? "",
    roles: body.role ?? [],
   };

}
  
