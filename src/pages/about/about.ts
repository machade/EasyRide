import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroRota } from '../../providers/cadastro-rota'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private Universidades: Array<any>;

  constructor(public navCtrl: NavController,
              public Info: CadastroRota) {
      this.getUniversidades();

  }

  getUniversidades() {
    this.Info.getDestUniversidade().subscribe( Data => {
      this.Universidades = Data;
    })
  }

}
