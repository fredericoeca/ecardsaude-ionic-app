import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-modal-desativar',
  templateUrl: 'modal-desativar.html',
})
export class ModalDesativarPage {

  public _id: any;
  public nome: any;
  public token: any;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public usuarioService: UsuarioProvider
  ) {
    this._id = navParams.get('_id');
    this.nome = navParams.get('nome');
  }

  desativar() {
    const confirm = this.alertCtrl.create({
      //title: 'Deseja apagar registro de vacinação?',
      message: 'Deseja desativar sua conta?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            if(navigator.onLine){
              this.showLoader();
              let usuario = {
                '_id': this._id
              }
              this.usuarioService.desativarUsuario(usuario)
                .subscribe(data => {
                  this.loading.dismiss();
                  this.res = data;
                  if(this.res.cod === 354){
                    this.logout();
                  } else {
                    this.presentToast(this.res.msg);
                  }        
                }, err => {
                  this.presentToast(err);
                });
            } else {
              this.presentToast('Sem conexão com a internet!');
            } 
          }
        }
      ]
    });
    confirm.present();
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'carregando...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  logout(){
    this.storage.clear();
    this.navCtrl.push(LoginPage);
  }

}
