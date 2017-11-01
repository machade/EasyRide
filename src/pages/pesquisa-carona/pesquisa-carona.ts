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

@IonicPage()
@Component({
  selector: 'page-pesquisa-carona',
  templateUrl: 'pesquisa-carona.html',
})
export class PesquisaCaronaPage {

  id:'';
  private localizacao: Array<any> = [];
  private dest_usuario: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cadRota: CadastroRota, public mapsApiLoader: MapsAPILoader) {
      this.getLocal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisaCaronaPage');
  }

  getLocal() {
    this.cadRota.getDestUsuario().subscribe(data => {
      this.dest_usuario = data;
      let local1=  new google.maps.LatLng( this.dest_usuario[0].localizacao.x, this.dest_usuario[0].localizacao.y);
      let local2=  new google.maps.LatLng( this.dest_usuario[1].localizacao.x, this.dest_usuario[1].localizacao.y) ;

      this.mapsApiLoader.load().then(() => {
        let dist = google.maps.geometry.spherical.computeDistanceBetween(local1,local2);
        console.log(dist);
      });
    });  
  }
}
