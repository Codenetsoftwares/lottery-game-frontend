class UrlConstant {
    constructor() {}
  

    url_dev = 'http://localhost:8080/api';
  
    // user api
    user = 'user';
    login = `${this.url_dev}/login`;
    generateTicketId=`${this.url_dev}/ticket-create`; 
    generateLottery=`${this.url_dev}/create-lottery`; 
    getLotteryTicket=`${this.url_dev}/getAllLotteries`;
    getPurchasedLotteryTicket=`${this.url_dev}/allPurchase-Lotteries`; 
    removeCreatedLottery=`${this.url_dev}/deleteAll-lotteries`;
    deletePurchasedLottery=`${this.url_dev}/deleteAll-purchaseLotteries`;
 
  }
  
  const urls = new UrlConstant();
  export default urls;
  