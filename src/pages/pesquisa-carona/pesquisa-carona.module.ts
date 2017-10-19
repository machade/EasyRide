import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisaCaronaPage } from './pesquisa-carona';

@NgModule({
  declarations: [
    PesquisaCaronaPage,
  ],
  imports: [
    IonicPageModule.forChild(PesquisaCaronaPage),
  ],
})
export class PesquisaCaronaPageModule {}
