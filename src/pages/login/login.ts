import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login-provider';
import { TabsPage } from '../tabs/tabs';
import { LocalStorageService } from 'angular-2-local-storage';



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
              public loginP: LoginProvider, public alertCtrl: AlertController,
              private localStorageService: LocalStorageService
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  postLogin(obj) {
    this.loginP.postLogin(obj).subscribe( data => {
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
        this.localStorageService.set("id",this.resposta.json().resultado.id);
        this.localStorageService.set("Nome",this.resposta.json().resultado.Nome);
        this.localStorageService.set("email",this.resposta.json().resultado.email);
        this.localStorageService.set("tipo",this.resposta.json().resultado.id_tipo);
      }
    })
  }

  entrar() {
    console.log(this.login);
    this.postLogin(this.login);    
  }
}
