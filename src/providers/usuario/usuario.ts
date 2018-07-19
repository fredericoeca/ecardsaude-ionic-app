import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioProvider {

  //public url : any = 'http://192.168.173.1:3000';
  //public url : any = 'http://172.16.221.245:3000';
    public url : any = 'http://localhost:3000';

  constructor(
    public http: Http
  ) {}

  //Carregar Usuário
  getUsuario(): Observable<any>{
    return this.http.get(this.url + '/usuarios/usuario')
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Editar conta Usuário
  updateUsuario(usuario): Observable<any>{
    return this.http.put(this.url + '/usuarios/update/' + usuario._id, usuario)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Desativar conta Usuário
  desativarUsuario(usuario): Observable<any>{
    return this.http.post(this.url + '/usuarios/desativar', usuario)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Trocar senha da conta
  changePassword(senhaAtual, novaSenha): Observable<any>{
    return this.http.post(this.url + '/usuarios/update/senha', {
        'senhaAtual': senhaAtual,
        'novaSenha' : novaSenha
      })
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Delete conta Usuário
  deleteUsuario(_id): Observable<any>{
    return this.http.delete(this.url + '/usuarios/delete/' + _id)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Salvar foto perfil
  saveFoto(usuario): Observable<any>{
    return this.http.post(this.url + '/usuarios/register/foto', usuario)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Registrar familiar
  registerFamiliar(familiar): Observable<any>{
    return this.http.post(this.url + '/usuarios/register/familiar', familiar)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Editar familiar
  updateFamiliar(familiar): Observable<any>{
    return this.http.post(this.url + '/usuarios/update/familiar', familiar)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Delete familiar
  deleteFamiliar(familiar): Observable<any>{
    return this.http.post(this.url + '/usuarios/delete/familiar', familiar)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Registrar Pet
  registerPet(pet): Observable<any>{
    return this.http.post(this.url + '/usuarios/register/pet', pet)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Editar Pet
  updatePet(pet): Observable<any>{
    return this.http.post(this.url + '/usuarios/update/pet', pet)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Delete Pet
  deletePet(pet): Observable<any>{
    return this.http.post(this.url + '/usuarios/delete/pet', pet)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Registrar vacinação
  registerVacinacao(registroVacinacao): Observable<any>{
    return this.http.post(this.url + '/usuarios/register/reg_vacina', registroVacinacao)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Editar registro de vacinação
  updateVacinacao(registroVacinacao): Observable<any>{
    return this.http.post(this.url + '/usuarios/update/reg_vacina', registroVacinacao)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Apagar registro de vacinação 
  deleteVacinacao(registroVacinacao): Observable<any>{
    return this.http.post(this.url + '/usuarios/delete/reg_vacina', registroVacinacao)
    .map( res => res.json())
    .catch( err => Observable.throw(err.message))
  }

  //Registrar vacinação pet
  registerVacinacaoPet(registroVacinacao): Observable<any>{
    return this.http.post(this.url + '/usuarios/pet/reg_vacina', registroVacinacao)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Editar registro de vacinação pet
  updateVacinacaoPet(registroVacinacao): Observable<any>{
    return this.http.post(this.url + '/usuarios/pet/upd_vacina', registroVacinacao)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  //Apagar registro de vacinação pet
  deleteVacinacaoPet(registroVacinacao): Observable<any>{
    return this.http.post(this.url + '/usuarios/pet/del_vacina', registroVacinacao)
    .map( res => res.json())
    .catch( err => Observable.throw(err.message))
  }
}
