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
  waypoint:any;

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
    this.incTrajeto.getCaronaLocalizacoes(obj).subscribe( data => {
      this.Localizacoes = data;
      this.Localizacoes.forEach( (obj) =>{
        debugger; 
        if(this.waypoint){
          this.waypoint = this.waypoint +'|' + obj.localizacao.x+' '+obj.localizacao.y;
        } else {
          this.waypoint =  obj.localizacao.x+' '+obj.localizacao.y;
        }      
        console.log(this.waypoint);
      })
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
    debugger;
    this.origin = this.RotaCarona[0].origem.x + ' ' + this.RotaCarona[0].origem.y;
    this.destination = this.RotaCarona[0].destino.x +' '+this.RotaCarona[0].destino.y;
    let link;
    if(this.Localizacoes.length < 0 ) {
      link = "https://www.google.com/maps/dir/?api=1&origin="+this.origin+"&destination="+this.destination+"&travelmode=driving&dir_action=navigate";
    } else {
      link = "https://www.google.com/maps/dir/?api=1&origin="+this.origin+"&destination="+this.destination+"&waypoints="+this.waypoint+"&travelmode=driving&dir_action=navigate";      
    }
    window.location.href=link;
    // waypoints=-23.519293	-47.46261179999999|-23.494848	-47.464567&
  }

  href() {
    window.location.href="https://www.google.com/maps/dir/?api=1&origin=-23.499824	-47.398534&destination=-23.5355275	-47.4639399&waypoints=-23.519293	-47.46261179999999|-23.494848	-47.464567&travelmode=driving&dir_action=navigate";
  }
}
