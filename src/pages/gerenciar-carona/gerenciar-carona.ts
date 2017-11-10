import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GerenciarCaronaProvider } from '../../providers/gerenciar-carona/gerenciar-carona';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';


/**
 * Generated class for the GerenciarCaronaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-gerenciar-carona',
  templateUrl: 'gerenciar-carona.html',
})
export class GerenciarCaronaPage {

  private solicitacoes: Array<any> = [];
  userID = '3';

  constructor(public navCtrl: NavController, public navParams: NavParams, public grcCarona: GerenciarCaronaProvider,
              public mapsApiLoader: MapsAPILoader) {
    this.getCaronasSolicitadas(this.userID)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GerenciarCaronaPage');
  }

  getCaronasSolicitadas(userID) {
    this.grcCarona.getCaronasSolicitadas(userID).subscribe( Data => {
      this.solicitacoes = Data;
      this. getRotasMapsApi();
    })
  }

  getRotasMapsApi() {
    console.log("maps");
    this.mapsApiLoader.load().then(() => {
      this.solicitacoes = this.solicitacoes.map( obj =>{
        let local1: any;
        if (obj.id_TipoRota == 1){
          local1 = new google.maps.LatLng (obj.LocalizacaoOrigem.x, obj.LocalizacaoOrigem.y);
        } else {
          local1 = new google.maps.LatLng (obj.LocalizacaoDestino.x, obj.LocalizacaoDestino.y);
        }
        let local2 = new google.maps.LatLng (obj.LocalCarona.x, obj.LocalCarona.y);
        let dist = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(local1, local2));
        return {
          id: obj.id,
          id_usuario: obj.id_usuario,
          nome: obj.nome,
          id_rota: obj.id_rota,
          CriadorRota: obj.CriadorRota,
          id_local: obj.id_local,
          LocalCarona: obj.LocalCarona,
          status: obj.status,
          id_TipoRota: obj.id_TipoRota,
          LocalizacaoOrigem: obj.LocalizacaoOrigem,
          LocalizacaoDestino: obj.LocalizacaoDestino,
          Distancia: dist
        }
      })
    })
  }
}
