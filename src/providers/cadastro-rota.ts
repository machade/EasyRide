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

  getDestUniversidade(){
    return this.http.get('http://localhost:3000/dest_universidade').map(res => res.json());
  }
  postLocal(local){
    console.log(local)
    return this.http.post('http://localhost:3000/local/novo', local).subscribe(data => console.log(data));
  } 
}
  
