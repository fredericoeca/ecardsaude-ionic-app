import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-modal-apagar',
  templateUrl: 'modal-apagar.html',
})
export class ModalApagarPage {

  _id: any;
  nome: any;
  public token: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public viewCtrl: ViewController,
    public http: Http,
    public alertCtrl: AlertController
  ) {
    this._id = navParams.get('_id');
    this.nome = navParams.get('nome');
  }

  apagar(){

    this.storage.get('token').then(val => {
      this.token = val;
    })    

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', this.token);

    let options = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:3000/usuarios/delete/' + this._id, options)
    .map(res => res.json())
    .subscribe(data => {
      if(data.cod === 368){
        this.dismiss();
      } else {
        this.showAlert(data.msg);
      }
    })

  }

  showAlert(msg) {
    const alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
