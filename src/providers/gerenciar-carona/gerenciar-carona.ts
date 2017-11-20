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
  url: any= "https://damp-ridge-66483.herokuapp.com/";
  // url: any= "http://localhost:3000/";
  constructor(public http: Http) {
    console.log('Hello GerenciarCaronaProvider Provider');
  }
  getCaronasSolicitadas(userID) {
    return this.http.get(this.url+'caronas/'+ userID).map(res => res.json());
  }

  getDisponibilidade(id_rota) {
    return this.http.get(this.url+'disponibilidade/'+ id_rota).map(res => res.json());
  }

  getDispositivoFromCarona(id_rota) {
    return this.http.get(this.url+'dispositivoFromCarona/'+ id_rota).map(res => res.json());
  }

  updateCarona(id) {
    return this.http.put(this.url+'carona/update', id);
  }

  deleteCarona(id) {
    return this.http.delete(this.url+'carona/delete/'+id);
  }

}
