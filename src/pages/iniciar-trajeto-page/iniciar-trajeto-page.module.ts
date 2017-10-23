import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IniciarTrajetoPage } from './iniciar-trajeto-page';

@NgModule({
  declarations: [
    IniciarTrajetoPage,
  ],
  imports: [
    IonicPageModule.forChild(IniciarTrajetoPage),
  ],
})
export class IniciarTrajetoPageModule {}
