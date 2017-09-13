import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Rotas } from './rotas';

@NgModule({
  declarations: [
    Rotas,
  ],
  imports: [
    IonicPageModule.forChild(Rotas),
  ],
})
export class RotasModule {}
