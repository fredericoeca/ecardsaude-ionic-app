import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class AuthProvider {

  //public url : any = 'http://192.168.173.1:3000';
  //public url : any = 'http://172.16.221.245:3000';
  public url : any = 'http://localhost:3000';

  constructor(
    public http: Http,
    public storage: Storage   
  ) {
  }

  login(credentials): Observable<any>{
    return this.http.post(this.url + '/usuarios/login', credentials)
      .map(res=> res.json())
      .catch( err => Observable.throw(err.message))
  }

  registerUser(user): Observable<any>{
    return this.http.post(this.url + '/usuarios/register', user)
      .map(res=> res.json())
  }

  userIsLogged(){
    return this.storage.get('token').then(val => {
      if(val !== null){
        return true;
      } else {
        return false;
      }
    })
  }

  getVacines(): Observable<any>{
    return this.http.get(this.url + '/vacinas/list')
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  getVacinesPet(): Observable<any>{
    return this.http.get(this.url + '/vacinaspet/list')
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  getMunicipios(): Observable<any>{
    return this.http.get(this.url + '/municipios/')
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  recovery(usuario): Observable<any>{
    return this.http.post(this.url + '/usuarios/recuperar', usuario)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  logout(){
    this.storage.clear();
  }

}
