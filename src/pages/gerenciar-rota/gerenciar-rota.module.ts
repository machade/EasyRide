import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciarRotaPage } from './gerenciar-rota';

@NgModule({
  declarations: [
    GerenciarRotaPage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciarRotaPage),
  ],
})
export class GerenciarRotaPageModule {}
