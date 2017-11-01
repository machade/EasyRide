import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PesquisaCaronaProvider } from '../../providers/pesquisa-carona/pesquisa-carona';
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

  index:'';
  
  pesquisa={
    destino:'',
    hora1:'',
    hora2:''
  }
  
  private dest_usuario: Array<any> = [];
  private caronas: Array<any> = [];
  private dest_universidade: Array<any> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public pesqCarona: PesquisaCaronaProvider, public mapsApiLoader: MapsAPILoader) {
      this.getDestUsuario();
      this.getDestUniversidades();
  }

  getDestUniversidades() {
    this.pesqCarona.getDestUniversidade().subscribe(data => {
      this.dest_universidade = data;
    })
  }


  getDestUsuario() {
    this.pesqCarona.getDestUsuario().subscribe(data => {
      this.dest_usuario = data;
    });  
  }
  getCaronas() {
    this.pesqCarona.getCaronas().subscribe(data => {
      this.caronas = data;
    })
  }

  procurar() {
    if(this.index){
      this.getCaronas();
      this.mapsApiLoader.load().then(() => {
        let local1 = new google.maps.LatLng (this.dest_usuario[this.index].localizacao.x, this.dest_usuario[this.index].localizacao.y);
        let local2 = new google.maps.LatLng (this.dest_usuario[3].localizacao.x, this.dest_usuario[3].localizacao.y);
        let distancia = google.maps.geometry.spherical.computeDistanceBetween(local1, local2);        
        console.log(distancia);
        console.log(this.pesquisa);
      })
    }
  }
}
