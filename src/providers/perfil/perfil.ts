import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the PerfilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfilProvider {
  url: any= "https://damp-ridge-66483.herokuapp.com/";
  // url: any = "http://localhost:3000/";
  
  constructor(public http: Http) {
    console.log('Hello PerfilProvider Provider');
  }

  getPerfil(userID) {
    return this.http.get(this.url+'dadosUsuario/'+ userID).map(res => res.json());
  }

}
