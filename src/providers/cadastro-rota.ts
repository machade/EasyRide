import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CadastroRota provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CadastroRota {

  constructor(public http: Http) {
    console.log('Hello CadastroRota Provider');
  }
  getRotas(){
    return this.http.get('http://localhost:3000/tipo_rota').map(res => res.json());
  }

  getOrigem(){
    return this.http.get('http://localhost:3000/origem').map(res => res.json());
  }
}
