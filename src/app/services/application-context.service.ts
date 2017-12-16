import { IApplicationContext } from './../interfaces/iapplication-context';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable()
export class ApplicationContextService {

  constructor() { }


  private _appContext:IApplicationContext;
  get appContext():IApplicationContext{
    return this._appContext
  }
  set appContext(ctx:IApplicationContext){
    this._appContext = ctx;
  }

  /**
   * Initialize the context at bootstrap
   */
  initContext(): Promise<any> {
    return new Promise((resolve, reject) => {

      // Do all the work inside the promise, it will be done before
      // the application is loaded.

      this.appContext = {
        contextId: this.getContextId(), 
        language: this.getLanguage(),
        province: this.getProvince(),
        junction: this.getJunction(),
        clientType: this.getClientType(),
        locales: this.getLocales()
      }
      resolve();
    });
  }

  /**
   * Get the language parameters
   */
  getContextId(): string {

    // In order to use MD5, you have to import it like this:
    // 1)  npm install ts-md5 --save
    // 2)  import { Md5 } from 'ts-md5/dist/md5'
    // 
    // To generate a key and add it to the table, use the host of the
    // url; the part between https:// and the fist / after. In this
    // case "https://app.belairdirect.com/qq/summary", the part to md5 will
    // be "app.belairdirect.com", equivalent to window.location.host.
    //
    // You can use this generator online: http://www.md5.cz/

    let host:string = Md5.hashAsciiStr(window.location.host).toString();

    switch(host){
      case "ea50a54d4ddb9ec64af3a99b283cef59" : return "belair"  //localhost:4200
      case "4faa5c4009eae53e960ec1e14e11402a" : return "intact"  //localhost:4201
      case "5cca438980ad2bbd08527c7b444e3c05" : return "bna" //localhost: 4202
      default: return ""
    }
  }

  /**
   * Get the language parameters
   */
  getLanguage():string{

    let allowed = ['fr', 'en'];
    let params:string[] = window.location.pathname.split("/");
    let lhash = typeof (params[2]) === "string" ? params[2].toLowerCase() : '';
    let lang = lhash.split("-")[0];
    if(!allowed.includes(lang)){
      lang = "";
    }
    return lang
      
  }


  /**
   * Get the province parameters
   */
  getProvince(): string {

    let allowed = ['qc', 'on'];
    let params: string[] = window.location.pathname.split("/");
    let phash = typeof (params[2]) === "string" ? params[2].toLowerCase() : '';
    let prov = phash.split("-")[1];
    if (!allowed.includes(prov)) {
      prov = "";
    }
    return prov

  }

  /**
   * Get the junction parameters
   */
  getJunction(): string {

    let params: string[] = window.location.pathname.split("/");
    return params[1]

  }

  /**
   * Get the locales parameters
   */
  getLocales(): string {

    let params: string[] = window.location.pathname.split("/");
    return params[2]

  }


  /**
   * Get the client device type based on user agent
   */
  getClientType(): string {
    
    let ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      return "mobile"
    }
    else {
      return "desktop"
    }

  }

}
