import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import {CadastroRota} from '../providers/cadastro-rota';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {PesquisaCaronaPage} from '../pages/pesquisa-carona/pesquisa-carona';
import { Rotas } from '../pages/rotas/rotas';
import { GerenciarRotaPage } from '../pages/gerenciar-rota/gerenciar-rota';
import {IniciarTrajetoPage} from '../pages/iniciar-trajeto-page/iniciar-trajeto-page';
import {CadastroRotaPage} from '../pages/cadastro-rota/cadastro-rota';
import {ModalRotaPage} from '../pages/modal-rota/modal-rota';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PesquisaCaronaProvider } from '../providers/pesquisa-carona/pesquisa-carona';
import { GerenciarCaronaPage } from '../pages/gerenciar-carona/gerenciar-carona'
import { GerenciarCaronaProvider } from '../providers/gerenciar-carona/gerenciar-carona';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Rotas,
    CadastroRotaPage,
    ModalRotaPage,
    PesquisaCaronaPage,
    GerenciarRotaPage,
    IniciarTrajetoPage,
    GerenciarCaronaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD6bNZvN0ku4bjfAbyajAdQJ-6sYBS4XFI",
      libraries: ["places","geometry","directions"]
    }),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Rotas,
    CadastroRotaPage,
    ModalRotaPage,
    PesquisaCaronaPage,
    GerenciarRotaPage,
    IniciarTrajetoPage,
    GerenciarCaronaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    CadastroRota,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PesquisaCaronaProvider,
    GerenciarCaronaProvider
  ]
})
export class AppModule {}
