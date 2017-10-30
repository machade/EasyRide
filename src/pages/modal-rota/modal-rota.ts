import { Component,ViewChild, ElementRef,OnInit,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {CadastroRota} from '../../providers/cadastro-rota';

/**
 * Generated class for the ModalRotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-modal-rota',
  templateUrl: 'modal-rota.html',
})
export class ModalRotaPage {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  local = {
    descricao: '',
    localizacao: ''
  }

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public geolocation: Geolocation,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              public alertCtrl: AlertController,
              private cadastroRota: CadastroRota) {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  ngOnInit() {
    //set google maps defaults
    this.zoom = 15;
    this.latitude = -23.5062;
    this.longitude = -47.4559;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });      
    });
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom =15;
      });
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Confirmar Cadastro');
    alert.setMessage('Insira abaixo a descrição para o novo local a ser cadastrado.');


    alert.addInput({
      name:'descricao',
      type: 'text',
      label: '',
      value: '',
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        this.dismiss();
        this.local.localizacao = this.latitude+','+this.longitude;
        this.local.descricao = data.descricao;
        this.cadastroRota.postLocal(this.local);
      }
    });
    alert.present();
  }
}
