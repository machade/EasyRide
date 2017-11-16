import { Component, Directive,  Input } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { IniciarTrajetoProvider } from '../../providers/iniciar-trajeto/iniciar-trajeto';

declare var google: any;




@Component({
  selector: 'page-iniciar-trajeto-page',
  templateUrl: 'iniciar-trajeto-page.html',
})
export class IniciarTrajetoPage {

  origin: any;
  destination: any;
  latitude: any;
  longitude: any;

  date = new Date(); // M-D-YYYY
  
   d = this.date.getDate();
   m = this.date.getMonth() + 1;
   y = this.date.getFullYear();


  testCheckboxOpen: boolean;
  testCheckboxResult: any;

  pesq = {
    id_usuario:'',
    id_TipoRota:'',
    dateString:''
  };

  private RotaCarona: Array <any>;
  private Localizacoes: Array <any>;
  private waypoints: Array <any>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private MapsAPILoader: MapsAPILoader,
              private incTrajeto: IniciarTrajetoProvider) {
    this.pesq.dateString = (this.d <= 9 ? '0' + this.d : this.d) + '-' + (this.m <= 9 ? '0' + this.m : this.m) + '-' + this.y;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarTrajetoPage');
    this.showCheckbox();
  }

  getRotaCarona(carona) {
    debugger;
    this.incTrajeto.getRotaCarona(carona).subscribe( data => {
      this.RotaCarona = data;
      if(this.RotaCarona){
        this.getCaronaLocalizacoes(this.RotaCarona);
      } else{
        console.log('Não existe carona')
      }
    })
  }

  getCaronaLocalizacoes(obj) {
    debugger;
    this.incTrajeto.getCaronaLocalizacoes(obj).subscribe( data => {
      this.Localizacoes = data;
      this.IniciarCarona();
    })
  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione a Rota a ser utilizada');

    alert.addInput({
      type: 'radio',
      label: 'Ida',
      value: '1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Volta',
      value: '2'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
       this.iniciar(data);
      }
    });
    alert.present();
  }

  iniciar(tipo) {
    if(tipo = 1){
      this.pesq.id_TipoRota = '1';
      this.pesq.id_usuario = '3';
      this.getRotaCarona(this.pesq);
    }else {
      this.pesq.id_TipoRota = '2';
      this.pesq.id_usuario = '3';
      this.getRotaCarona(this.pesq);
    }
  }
  
  IniciarCarona() {
    this.latitude = -23.4698525;
    this.longitude = -47.5760304;
    this.origin= {latitude: this.RotaCarona[0].origem.x, longitude: this.RotaCarona[0].origem.y};
    this.destination = {latitude: this.RotaCarona[0].destino.x, longitude: this.RotaCarona[0].destino.y};
  }
}
