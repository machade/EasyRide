import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import {CadastroRotaPage} from '../cadastro-rota/cadastro-rota';
/**
 * Generated class for the Rotas page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-rotas',
  templateUrl: 'rotas.html',
})
export class Rotas {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Rotas');
  }
  
  goToCadastroRota(){
    this.navCtrl.push(CadastroRotaPage);
  }

}
