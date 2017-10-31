import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CadastroRota } from '../../providers/cadastro-rota';
import { CadastroRotaPage } from '../cadastro-rota/cadastro-rota';

/**
 * Generated class for the GerenciarRotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gerenciar-rota',
  templateUrl: 'gerenciar-rota.html',
})
export class GerenciarRotaPage {
  
  listaRotas: Array<any> = [];
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cadastroRota: CadastroRota,
              public alertCtrl: AlertController) {
    this.getListarRotas();
  }
  ionViewWillEnter(){
    this. getListarRotas();
  }

  getListarRotas() {
    this.cadastroRota.getListarRotas().subscribe(data => {
      console.log(data);
      this.listaRotas = data;
    })
  }

  Delete(id) {
    this.cadastroRota.deleteRota(id).subscribe(data => {
      console.log(data);
      const alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Rota excluida com Sucesso',
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
  editar(rota) {
    this.navCtrl.push(CadastroRotaPage,{data: rota});
  }
}
