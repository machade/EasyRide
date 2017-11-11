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

  getDisponibilidade(id_rota) {
    return this.http.get('http://localhost:3000/disponibilidade/'+ id_rota).map(res => res.json());
  }

  updateCarona(id) {
    return this.http.put('http://localhost:3000/carona/update', id);
  }

  deleteCarona(id) {
    return this.http.delete('http://localhost:3000/carona/delete/'+id);
  }

}
