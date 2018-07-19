import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ModalEditVacinacaoPage } from '../modal-edit-vacinacao/modal-edit-vacinacao';

@IonicPage()
@Component({
  selector: 'page-controle-vacinas',
  templateUrl: 'controle-vacinas.html',
})
export class ControleVacinasPage {

  public regVacinas: any;
  public _id: any;
  public nome: any;
  public loading: any;
  public res: any;
  public usuario: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public viewCtrl: ViewController,
    public usuarioService: UsuarioProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {

    this._id = this.navParams.get('_id');
    
    if(navigator.onLine){
      this.usuarioService.getUsuario()
        .subscribe( data => {
          this.usuario = data;
          this.nome = this.usuario.nome;
          this.regVacinas = this.usuario.registro_vacinas;
          console.log('connected');
        })
    } else {
      this.storage.get('usuario').then(val => {
        this.nome = val.nome;
        this.regVacinas = val.registro_vacinas;
        console.log('desconnected');
      })  
    }    
  }

  editarRegistro(rv){
    if(navigator.onLine){
      let myModal = this.modalCtrl.create(ModalEditVacinacaoPage, {
        '_id': rv._id,
        'nome': this.nome,
        'vacina': rv.vacina,
        'dose': rv.dose,
        'data': rv.data,
        'local': rv.local,
        'agente': rv.agente,
        'lote': rv.lote,
        'rede': rv.rede
      })
      myModal.onDidDismiss(() => {        
        this.usuarioService.getUsuario().subscribe( data => {
            this.res = data;
            this.regVacinas = this.res.registro_vacinas;
            this.storage.set('usuario', this.res);
        })      
    });
    myModal.present();
    } else {
      this.presentToast('Sem conexão com internet!');
    }
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

}
