import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController} from 'ionic-angular';
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
    id:null,
    tipoRota: '',
    previsao: '',
    origem:'',
    destino:'',
    qtdeLugares: ''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public http: Http,
              private cadastroRota: CadastroRota,
              public alertCtrl: AlertController) {  
      this.Rota.tipoRota='1';              
      this.getRota();
      this.getDestUniversidade();
      this.getDestUsuario();
      let data = navParams.get('data');
      console.log(data);
      if (data) {
        this.Rota = {
          id: data.id,
          tipoRota: data.id_TipoRota,
          previsao: data.previsao,
          origem: data.id_origem,
          destino: data.id_destino,
          qtdeLugares: data.qtdelugar
        }
      }
  }
  posts: any;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroRotaPage');
  }

  insert(){
    let modal =  this.modalCtrl.create(ModalRotaPage);
    modal.onDidDismiss(data => {
      this.getDestUsuario();
    });
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
  getDestUsuario() {
    this.cadastroRota.getDestUsuario().subscribe(data => {
      this.dest_usuario = data;
    });  
  }
  Salvar() {
    this.cadastroRota.postRota(this.Rota).subscribe(data =>{
      
      const alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Rota Cadastrada com Sucesso',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();
      
    })
  }
  confirmar() {
    if (this.Rota.id) {
      this.atualizar();
    } else {
      this.Salvar();
    }
  }

  atualizar() {
    this.cadastroRota.updateRota(this.Rota).subscribe(data =>{
      const alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Rota Atualizada com Sucesso',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();
      
    })
  }

  Cancelar() {
    this.navCtrl.pop();
  }
}
