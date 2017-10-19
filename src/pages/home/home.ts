import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Rotas} from '../rotas/rotas';
import { PesquisaCaronaPage } from '../pesquisa-carona/pesquisa-carona';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {

  }

  goToRotas(){
    this.navCtrl.push(Rotas);
  }

  goToPesquisaCarona(){
    this.navCtrl.push(PesquisaCaronaPage);
  }
}
