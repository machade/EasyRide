import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider';
import { TabsPage } from '../tabs/tabs';
import { LocalStorageCustom } from '../../services/localStorageCustom';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login={
    email:'',
    password:''
  }
  resposta: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loginP: LoginProvider, public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  postLogin(obj) {
    this.loginP.postLogin(obj).subscribe( data => {
      debugger;
      this.resposta = data;
      console.log(this.resposta);
      if (this.resposta.status == 204) {
        const alert = this.alertCtrl.create({
          title: 'Atenção',
          subTitle: 'Erro ao efetuar login, confira os dados inseridos',
          buttons: [{
            text: 'OK',
            handler: () => {
            }
          }]
        });
        alert.present();
      } else if (this.resposta.status == 200) {
        this.navCtrl.push(TabsPage);
        
      }
    })
  }

  entrar() {
    console.log(this.login);
    this.postLogin(this.login);
  }
}
