import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class NotificationProvider {

  //public url : any = 'http://192.168.173.1:3000';
  //public url : any = 'http://172.16.221.245:3000';
  public url : any = 'http://localhost:3000';
  
  constructor(
    public http: Http
  ) {
  }

  getNotifications(): Observable<any>{
    return this.http.get(this.url + '/notifications/')
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  like(notification): Observable<any>{
    return this.http.post(this.url + '/notifications/curtidas/like', notification)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

  unlike(notification): Observable<any>{
    return this.http.post(this.url + '/notifications/curtidas/unlike', notification)
      .map( res => res.json())
      .catch( err => Observable.throw(err.message))
  }

}
