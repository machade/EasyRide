import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroRotaPage } from './cadastro-rota';

@NgModule({
  declarations: [
    CadastroRotaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroRotaPage),
  ],
})
export class CadastroRotaPageModule {}
