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

  url: any= "https://damp-ridge-66483.herokuapp.com/"
  // url: any = "http://localhost:3000/";
  
  constructor(public http: Http) {
    console.log('Hello PesquisaCaronaProvider Provider');
  }

  getTipoRotas() {
    return this.http.get(this.url+'tipo_rota').map(res => res.json());
  }

  getDestUsuario(userID) {
    return this.http.get(this.url+'dest_usuario/' + userID).map(res => res.json());
  }
  
  getCaronasIda(pesq) {
    return this.http.get(this.url+'ListaCaronasIda/'+ pesq.destino+'&&'
                                                              + pesq.hora1 + '&&'
                                                              + pesq.hora2 + '&&'
                                                              + pesq.dateString + '&&'
                                                              + pesq.userID).map(res => res.json());
  }

  getCaronasVolta(pesq) {
    return this.http.get(this.url+'ListaCaronasVolta/'+ pesq.destino+'&&'
                                                              + pesq.hora1 + '&&'
                                                              + pesq.hora2 + '&&'
                                                              + pesq.dateString + '&&'
                                                              + pesq.userID).map(res => res.json());
  }
  
  getDestUniversidade() {
    return this.http.get(this.url+'dest_universidade').map(res => res.json());
  }

  postCarona(solicitar) {
    return this.http.post(this.url+'carona/novo', solicitar);
  } 

  getDispositivo(id_rota) {
    return this.http.get(this.url+'dispositivoFromRota/'+ id_rota).map(res => res.json());
  }
}
