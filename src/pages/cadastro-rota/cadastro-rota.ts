import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal,ModalController} from 'ionic-angular';
import {ModalRotaPage} from '../modal-rota/modal-rota';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroRotaPage');
  }

  insert(){
    let modal =  this.modalCtrl.create(ModalRotaPage);
    modal.present();
  }
}
