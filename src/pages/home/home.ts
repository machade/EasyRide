import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import {Rotas} from '../rotas/rotas';
import { PesquisaCaronaPage } from '../pesquisa-carona/pesquisa-carona';
import { IniciarTrajetoPage } from '../iniciar-trajeto-page/iniciar-trajeto-page';
import {ModalRotaPage} from '../modal-rota/modal-rota';
import { GerenciarCaronaPage } from '../gerenciar-carona/gerenciar-carona'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController) {

  }

  goToRotas(){
    this.navCtrl.push(Rotas);
  }

  goToPesquisaCarona(){
    this.navCtrl.push(PesquisaCaronaPage);
  }

  goToIniciarTrajeto(){
    this.navCtrl.push(IniciarTrajetoPage);
  }
  
  goToLocais(){
    let modal =  this.modalCtrl.create(ModalRotaPage);
    modal.present();
  }

  goToGerenciarCaronas() {
    this.navCtrl.push(GerenciarCaronaPage);
  }
}
