class UrlConstant {
    constructor() {}
  

    url_dev = 'http://localhost:8080/api';
  
    // user api
    user = 'user';
    login = `${this.url_dev}/login`;
    generateTicketId=`${this.url_dev}/ticket-create`; 
    generateLottery=`${this.url_dev}/create-lottery`; 
 
  }
  
  const urls = new UrlConstant();
  export default urls;
  