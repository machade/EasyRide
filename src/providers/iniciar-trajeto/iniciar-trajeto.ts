import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the IniciarTrajetoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IniciarTrajetoProvider {

  constructor(public http: Http) {
    console.log('Hello IniciarTrajetoProvider Provider');
  }

  getRotaCarona(pesq) {
    return this.http.get('http://localhost:3000/RotaCarona/'+ pesq.id_usuario+'&&'
                                                            + pesq.id_TipoRota + '&&'
                                                            + pesq.dateString ).map(res => res.json());
  }

  getCaronaLocalizacoes(carona) {
    debugger;
    return this.http.get('http://localhost:3000/CaronaLocalizacoes/'+ carona[0].id_rota).map(res => res.json());
  }

}
