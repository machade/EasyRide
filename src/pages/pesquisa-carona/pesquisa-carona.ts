import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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
  private caronasftl: Array<any> = [];
  private dest_universidade: Array<any> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public pesqCarona: PesquisaCaronaProvider, 
              public mapsApiLoader: MapsAPILoader,
              public alertCtrl: AlertController) {
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
    this.pesqCarona.getCaronas(this.pesquisa).subscribe(data => {
      this.caronas = data;
    })
  }

  
  
  procurar() {
    this.caronasftl = [];
    if(this.index && this.pesquisa.destino && this.pesquisa.hora1 && this.pesquisa.hora2) {
      this.getCaronas();
      this.mapsApiLoader.load().then(() => {
        this.caronas = this.caronas.map( obj =>{
          let local1 = new google.maps.LatLng (this.dest_usuario[this.index].localizacao.x, this.dest_usuario[this.index].localizacao.y);
          let local2 = new google.maps.LatLng (obj.localizacao.x, obj.localizacao.y);
          let dist = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(local1, local2));
          return {id:obj.id,
                  id_usuario:obj.id_usuario,
                  nome: obj.nome,
                  id_TipoRota: obj.id_TipoRota,
                  descricao_TipoRota: obj.descricao_TipoRota,
                  id_origem: obj.id_origem,
                  origem: obj.origem,
                  localizacao: obj.localizacao,
                  id_destino: obj.id_destino,
                  destino: obj.destino,
                  previsao: obj.previsao,
                  qtdelugar: obj.qtdelugar,
                  distancia: obj.distancia,
                  distanciaPonto: dist
                  }
        })
        this.caronasftl = this.caronas.filter( obj => {   
          if (obj.distanciaPonto <= obj.distancia){
            return true;
          } else {
            return false;
          }
        });
        console.log(this.caronas);
        console.log(this.caronasftl);
      })
    } else {

      const alert = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'Preencha Todos os campos',
        buttons: [{
          text: 'OK',
          handler: () => {
          }
        }]
      });
      alert.present();

    }
  }


}
