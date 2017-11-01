import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroRota } from '../../providers/cadastro-rota';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

/**
 * Generated class for the PesquisaCaronaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-pesquisa-carona',
  templateUrl: 'pesquisa-carona.html',
})
export class PesquisaCaronaPage {

  id:'';
  
  private dest_usuario: Array<any> = [];
  private caronas: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cadRota: CadastroRota, public mapsApiLoader: MapsAPILoader) {
      this.getLocal();
  }
  getLocal() {
    this.cadRota.getDestUsuario().subscribe(data => {
      this.dest_usuario = data;
    });  
  }
  getCaronas() {
    this.cadRota.getRotas().subscribe(data => {
      this.caronas = data;
    })
  }
}
