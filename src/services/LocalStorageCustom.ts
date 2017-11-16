import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable } from '@angular/core';
 
@Injectable()
export class LocalStorageCustom {
 
    constructor(private localStorageService: LocalStorageService) {
 
    }
 
    autenticar(id, nome, email, id_tipo) {
        this.localStorageService.add('id', id);
        this.localStorageService.add('nome', nome);
        this.localStorageService.add('email', email);
        this.localStorageService.add('id_tipo', id_tipo);
    }
 
    estaAutenticado() {
        if (localStorage.getItem('id') != undefined)
            return true;
        else
            return false;
    }
    deslogar() {
        this.localStorageService.clearAll();
    }
 

    getId() {
        return this.localStorageService.get('id');
    }

    getNome() {
        return this.localStorageService.get('nome');
    }

    getEmail() {
        return this.localStorageService.get('email');
    }

    getTipo(){
        return this.localStorageService.get('id_tipo')
    }
}