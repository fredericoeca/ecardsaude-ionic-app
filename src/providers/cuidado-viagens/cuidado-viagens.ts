import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class CuidadoViagensProvider {

  //public url : any = 'http://192.168.173.1:3000';
  //public url : any = 'http://172.16.221.245:3000';
  public url : any = 'http://localhost:3000';
  
  constructor(
    public http: Http
  ) {
  }

  getCuidados(): Observable<any>{
    return this.http.get(this.url + '/viagens/list')
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

}
