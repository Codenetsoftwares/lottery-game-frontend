class UrlConstant {
    constructor() {}
  

    url_dev = 'http://localhost:8080/api';
  
    // user api
    user = 'user';
    login = `${this.url_dev}/login`;
 
  }
  
  const urls = new UrlConstant();
  export default urls;
  