import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroRota } from '../../providers/cadastro-rota';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private Universidades: Array<any>;
  usuario={
    nome:'',
    tipo:'',
    cnh:'',
    campus:'',
  };

  constructor(public navCtrl: NavController,
              public Info: CadastroRota,
              public perfil: PerfilProvider,
              private localStorageService: LocalStorageService) {
      this.getUniversidades();
      this.getUsuario();
  }

  getUniversidades() {
    this.Info.getDestUniversidade().subscribe( Data => {
      this.Universidades = Data;
    })
  }
  getUsuario() {
    this.perfil.getPerfil(this.localStorageService.get<string>("id")).subscribe( data =>{
      console.log(data);
      this.usuario.nome = data[0].nome + ' ' + data[0].sobrenome ;
      this.usuario.tipo = data[0].id_tipo;
      this.usuario.cnh = data[0].cnh;
      this.usuario.campus = data[0].id_universidade
    })
  }

}
