import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  url: any= "https://damp-ridge-66483.herokuapp.com/"  ;
  // url: any = "http://localhost:3000/";

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  postLogin(login) {
    return this.http.post(this.url+'login', login);
  } 

  updateDispositivo(user) {
    return this.http.put(this.url+'dispositivo/update', user);    
  }

}
