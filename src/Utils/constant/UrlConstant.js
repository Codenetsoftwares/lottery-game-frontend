/* eslint-disable no-useless-constructor */
class UrlConstant {
    constructor() {}
  
    url_dev = 'http://localhost:7000/api';
  
    // admin-related endpoints
    admin = 'admin';
    login = `${this.url_dev}/${this.admin}-login`;
    adminLogout = `${this.url_dev}/${this.admin}-logout`;
  
  
  }
  
  const urls = new UrlConstant();
  export default urls;
  