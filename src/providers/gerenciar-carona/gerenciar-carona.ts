import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GerenciarCaronaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GerenciarCaronaProvider {

  constructor(public http: Http) {
    console.log('Hello GerenciarCaronaProvider Provider');
  }
  getCaronasSolicitadas(userID) {
    return this.http.get('http://localhost:3000/caronas/'+ userID).map(res => res.json());
  }

}
