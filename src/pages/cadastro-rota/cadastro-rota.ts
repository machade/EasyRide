import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {ModalRotaPage} from '../modal-rota/modal-rota';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {CadastroRota} from '../../providers/cadastro-rota';


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

  private tipo_rota:Array<any> = [];
  private id_universidade:Array<any> = [];

  Rota = {
    tipoRota: '',
    hora: '',
    origem:'',
    qtdeLugares: '',
    localPartida: ''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public http: Http,
              private cadastroRota: CadastroRota) {
      this.getRota();
      this.getDestUniversidade();
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
    this.cadastroRota.getRotas().subscribe(data => {
      this.tipo_rota = data;
    });  
  }
  getDestUniversidade(){
    this.cadastroRota.getDestUniversidade().subscribe(data => {
      this.id_universidade = data;
      console.log(this.id_universidade);
    });  
  }
}
