import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {ModalRotaPage} from '../modal-rota/modal-rota';
import { Http } from '@angular/http';
import 'rxjs/Rx';


/**
 * Generated class for the CadastroRotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-rota',
  templateUrl: 'cadastro-rota.html',
})
export class CadastroRotaPage {

  private tipo_rota:Array<any>;
  cadastroRota = {
    tipoRota: '',
    hora: '',
    qtdeLugares: '',
    localPartida: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
    public http: Http) {
      this.getRota();
  }
  posts: any;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroRotaPage');
  }

  insert(){
    let modal =  this.modalCtrl.create(ModalRotaPage);
    modal.present();
  }

  getRota(){
    this.tipo_rota = [];
    this.http.get('http://localhost:3000/tipo_rota').map(res => res.json()).subscribe(data => {
      this.tipo_rota = data;
      console.log(this.tipo_rota);
    });  
  }
}
