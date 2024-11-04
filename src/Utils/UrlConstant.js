class UrlConstant {
  constructor() {}

   url_dev = "https://lottery.server.dummydoma.in/api";
  // url_dev = 'http://localhost:8080/api';

  // admin api

  login = `${this.url_dev}/login`;
  generateTicketId = `${this.url_dev}/ticket-create`;
  generateLottery = `${this.url_dev}/create-lottery`;
  getLotteryTicket = `${this.url_dev}/getAllLotteries`;
  getPurchasedLotteryTicket = `${this.url_dev}/allPurchase-Lotteries`;// not in use as of now
  removeCreatedLottery = `${this.url_dev}/deleteAll-lotteries`;
  deletePurchasedLottery = `${this.url_dev}/deleteAll-purchaseLotteries`; // not in use as of now
  UnPurchasedLotteryDelete = `${this.url_dev}/lotteries/delete-non-purchased`;
  getSelectSem = `${this.url_dev}/generate-tickets`;
  SingleDeleteCard = `${this.url_dev}/delete-particularLottery`;
  SingleEditCard = `${this.url_dev}/edit-particularLottery`;
  generateNumber= `${this.url_dev}/generate-ticket`;
  searchTicket=`${this.url_dev}/admin/search-ticket`;
  PurchasedLotteryHistory=`${this.url_dev}/admin/purchase-history`;
  lotteryClock = `${this.url_dev}/admin/draw-dates`
}

const urls = new UrlConstant();
export default urls;
