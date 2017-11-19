import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController} from 'ionic-angular';
import {ModalRotaPage} from '../modal-rota/modal-rota';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {CadastroRota} from '../../providers/cadastro-rota';
import { NgIf } from '@angular/common';
import { LocalStorageService } from 'angular-2-local-storage';


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
  
   date = new Date(); // M-D-YYYY
  
   d = this.date.getDate();
   m = this.date.getMonth() + 1;
   y = this.date.getFullYear();
  
  

  Rota = {
    id:null,
    userID:'',
    tipoRota: '',
    previsao: '',
    origem:'',
    destino:'',
    distancia:'',
    qtdeLugares: '',
    dateString:''
  }
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public http: Http,
              private cadastroRota: CadastroRota,
              public alertCtrl: AlertController,
              private localStorageService: LocalStorageService) {  
      this.Rota.dateString = (this.d <= 9 ? '0' + this.d : this.d) + '-' + (this.m <= 9 ? '0' + this.m : this.m) + '-' + this.y;
      this.Rota.tipoRota='1';              
      this.getRota();
      this.getDestUniversidade();
      this.getDestUsuario();
      let data = navParams.get('data');
      console.log(data);
      if (data) {
        this.Rota = {
          id: data.id,
          userID: data.id_usuario,
          tipoRota: data.id_TipoRota,
          previsao: data.previsao,
          origem: data.id_origem,
          destino: data.id_destino,
          distancia: data.distancia,
          qtdeLugares: data.qtdelugar,
          dateString: data.dateString
        }
      }
      console.log(this.Rota.dateString);
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
    this.cadastroRota.getDestUsuario(this.localStorageService.get("id")).subscribe(data => {
      this.dest_usuario = data;
    });  
  }
  Salvar() {
    this.Rota.userID = this.localStorageService.get<string>("id");
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
