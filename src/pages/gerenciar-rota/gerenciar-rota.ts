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
      this.listaRotas = data;
    })
  }

  Delete(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Atenção');
    alert.setMessage('Confirmar Exclusão de Rota.');

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        this.navCtrl.pop();
        this.cadastroRota.deleteRota(id).subscribe(data => {
	});
      }
    });
    alert.present();
  }
  editar(rota) {
    this.navCtrl.push(CadastroRotaPage,{data: rota});
  }
}
