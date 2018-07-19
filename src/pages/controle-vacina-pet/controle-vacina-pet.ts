import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ModalEditVacinacaoPetPage } from '../modal-edit-vacinacao-pet/modal-edit-vacinacao-pet';
import { ModalRegVacinacaoPetPage } from '../modal-reg-vacinacao-pet/modal-reg-vacinacao-pet';

@IonicPage()
@Component({
  selector: 'page-controle-vacina-pet',
  templateUrl: 'controle-vacina-pet.html',
})
export class ControleVacinaPetPage {

  public regvacinas: any;
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
          this.regvacinas = this.usuario.registro_vacinas_pet;
        })
    } else {
      this.storage.get('usuario').then(val => {
        this.nome = val.nome;
        this.regvacinas = val.registro_vacinas_pet;
      })  
    }    
  }

  editarRegistro(rv){
    if(navigator.onLine){
      let myModal = this.modalCtrl.create(ModalEditVacinacaoPetPage, {
        '_id': rv._id,
        'nome': this.nome,
        'vacina': rv.vacina,
        'data': rv.data,
        'local': rv.local,
        'agente': rv.agente,
        'lote': rv.lote
      })
      myModal.onDidDismiss(() => {        
        this.usuarioService.getUsuario().subscribe( data => {
            this.res = data;
            this.regvacinas = this.res.registro_vacinas_pet;
            this.storage.set('usuario', this.res);
        })      
    });
    myModal.present();
    } else {
      this.presentToast('Sem conexão com internet!');
    }
  }
  
  goToRegVacPet(){
    if(navigator.onLine){
      let myModal = this.modalCtrl.create(ModalRegVacinacaoPetPage, {
        'pet': this._id
      })
      myModal.onDidDismiss(() => {        
        this.usuarioService.getUsuario().subscribe( data => {
            this.res = data;
            this.regvacinas = this.res.registro_vacinas_pet;
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
