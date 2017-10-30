import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {ModalRotaPage} from '../modal-rota/modal-rota';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {CadastroRota} from '../../providers/cadastro-rota';
import { NgIf } from '@angular/common';

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
  private dest_universidade:Array<any> = [];
  private dest_usuario:Array<any> = [];
  

  Rota = {
    tipoRota: '',
    hora: '',
    origem:'',
    destino:'',
    qtdeLugares: ''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public http: Http,
              private cadastroRota: CadastroRota) {
      this.Rota.tipoRota='1';                
      this.getRota();
      this.getDestUniversidade();
      this.getDestUsuario();
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
      this.dest_universidade = data;
    });  
  }
  getDestUsuario(){
    this.cadastroRota.getDestUsuario().subscribe(data => {
      this.dest_usuario = data;
    });  
  }
  Salvar(){

  }
}
