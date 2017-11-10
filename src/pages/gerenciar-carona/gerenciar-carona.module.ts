import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciarCaronaPage } from './gerenciar-carona';

@NgModule({
  declarations: [
    GerenciarCaronaPage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciarCaronaPage),
  ],
})
export class GerenciarCaronaPageModule {}
