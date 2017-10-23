import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';


@Component({
  selector: 'page-iniciar-trajeto-page',
  templateUrl: 'iniciar-trajeto-page.html',
})
export class IniciarTrajetoPage {
  testCheckboxOpen: boolean;
  testCheckboxResult: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarTrajetoPage');
    this.showCheckbox();
  }
  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione a Rota a ser utilizada');

    alert.addInput({
      type: 'radio',
      label: 'Casa',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Trabalho',
      value: 'value2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

}
