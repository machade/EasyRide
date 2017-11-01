import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PesquisaCaronaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PesquisaCaronaProvider {

  constructor(public http: Http) {
    console.log('Hello PesquisaCaronaProvider Provider');
  }
  getDestUsuario() {
    return this.http.get('http://localhost:3000/dest_usuario').map(res => res.json());
  }
  
  getCaronas() {
    return this.http.get('http://localhost:3000/ListaCaronas').map(res => res.json());
  }

  getDestUniversidade() {
    return this.http.get('http://localhost:3000/dest_universidade').map(res => res.json());
  }
}
