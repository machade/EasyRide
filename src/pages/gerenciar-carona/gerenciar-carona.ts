import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import { GerenciarCaronaProvider } from '../../providers/gerenciar-carona/gerenciar-carona';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { LocalStorageService } from 'angular-2-local-storage';


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
  private idFromCarona: Array<any> = [];
  
  solicitacao = { ocupadas:'',
                  qtdelugar:''}
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public grcCarona: GerenciarCaronaProvider,
              public mapsApiLoader: MapsAPILoader,public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, private localStorageService: LocalStorageService) {
    this.presentLoadingDefault();
    this.getCaronasSolicitadas(this.localStorageService.get<string>("id"));
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

  getDiponibilidade(obj) {
    this.grcCarona.getDisponibilidade(obj.id_rota).subscribe(Data => {
      this.solicitacao = Data;
      this.VerificarDisponibilidade(obj);
    })
  }

  updateCarona(id) {
    this.BuildNotificationAccept(id);
    this.grcCarona.updateCarona(id).subscribe(Data =>{
      const alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Usuário Adicionado a Carona',
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
  deleteSolicitacao(id) {
    this.grcCarona.deleteCarona(id).subscribe( Data => {
      const alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Solicitação excluida',
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
  getRotasMapsApi() {
    this.mapsApiLoader.load().then(() => {
      this.solicitacoes = this.solicitacoes.map( obj =>{
        let local1: any;
        let tipo: any;
        if (obj.id_TipoRota == 1){
          local1 = new google.maps.LatLng (obj.LocalizacaoOrigem.x, obj.LocalizacaoOrigem.y);
          tipo = "Ida";
        } else {
          local1 = new google.maps.LatLng (obj.LocalizacaoDestino.x, obj.LocalizacaoDestino.y);
          tipo = "Volta";
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
          Distancia: dist,
          TipoRota: tipo
        }
      })
    })
  }

  AceitarCarona(obj) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Confirmar');
    alert.setMessage('Deseja confirmar usuário em carona?');

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        this.getDiponibilidade(obj);
      }
    });
    alert.present();
  }

  DeleteSolicitacao(obj) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Atenção');
    alert.setMessage('Deseja recusar a solicitação de carona?');
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        this.deleteSolicitacao(obj.id);
        this.BuildNotificationDenied(obj.id);
      }
    });
    alert.present();
  }

  VerificarDisponibilidade(obj) {
    debugger;
      if (this.solicitacao[0].ocupadas < this.solicitacao[0].qtdelugar){
        this.updateCarona(obj);
      } else {
        const alert = this.alertCtrl.create({
          title: 'Atenção',
          subTitle: 'Nenhuma vaga disponivel para esta viagem!',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
        });
        alert.present();
      }
  }


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      spinner:'dots',
      content: 'Carregando',
    });
  
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  BuildNotificationAccept(id) {
    this.grcCarona.getDispositivoFromCarona(id).subscribe(data => {
      debugger;      
      this.idFromCarona = data;
      var msg = { 
        contents: {
          en: "Sua carona foi confirmar, horário previsto de saída: " + this.idFromCarona[0].previsao
        },
        include_player_ids: [this.idFromCarona[0].dispositivo]
      }
      window["plugins"].OneSignal.postNotification(msg,
        successResponse => {
          // Sucesso
        },
        erro => {
          // Erro
        }
      );
    })
  }

  BuildNotificationDenied(id) {
    this.grcCarona.getDispositivoFromCarona(id).subscribe(data => {
      debugger;      
      this.idFromCarona = data;
      var msg = { 
        contents: {
          en: "Sua carona foi recusada"
        },
        include_player_ids: [this.idFromCarona[0].dispositivo]
      }
      window["plugins"].OneSignal.postNotification(msg,
        successResponse => {
          // Sucesso
        },
        erro => {
          // Erro
        }
      );
    })
  }
}
