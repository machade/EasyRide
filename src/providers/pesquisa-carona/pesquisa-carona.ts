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

  getTipoRotas() {
    return this.http.get('http://localhost:3000/tipo_rota').map(res => res.json());
  }

  getDestUsuario() {
    return this.http.get('http://localhost:3000/dest_usuario').map(res => res.json());
  }
  
  getCaronasIda(pesq) {
    return this.http.get('http://localhost:3000/ListaCaronasIda/'+ pesq.destino+'&&'
                                                              + pesq.hora1 + '&&'
                                                              + pesq.hora2 + '&&'
                                                              + pesq.dateString).map(res => res.json());
  }

  getCaronasVolta(pesq) {
    return this.http.get('http://localhost:3000/ListaCaronasVolta/'+ pesq.destino+'&&'
                                                              + pesq.hora1 + '&&'
                                                              + pesq.hora2 + '&&'
                                                              + pesq.dateString).map(res => res.json());
  }
  
  getDestUniversidade() {
    return this.http.get('http://localhost:3000/dest_universidade').map(res => res.json());
  }
}
