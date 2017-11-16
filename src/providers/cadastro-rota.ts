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
  // url: any= "https://damp-ridge-66483.herokuapp.com/";
  url: any = "http://localhost:3000/";
  
  constructor(public http: Http) {
    console.log('Hello CadastroRota Provider');
  }
  getRotas() {
    return this.http.get(this.url+'tipo_rota').map(res => res.json());
  }

  getListarRotas() {
    return this.http.get(this.url+'listarRota').map(res => res.json());
  }

  getDestUniversidade() {
    return this.http.get(this.url+'dest_universidade').map(res => res.json());
  }
  getDestUsuario() {
    return this.http.get(this.url+'dest_usuario').map(res => res.json());
  }
  postLocal(local) {
    return this.http.post(this.url+'local/novo', local);
  } 
  postRota(Rota) {
    return this.http.post(this.url+'rota/novo', Rota);
  }

  updateRota(Rota) {
    return this.http.put(this.url+'rota/update', Rota);
  }

  deleteRota(id) {
    debugger;
    return this.http.delete(this.url+'rota/delete/'+id);
  }
}
  
