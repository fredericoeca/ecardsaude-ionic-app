import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-modal-edit-vacinacao-pet',
  templateUrl: 'modal-edit-vacinacao-pet.html',
})
export class ModalEditVacinacaoPetPage {
  
  public editarVacinaForm: FormGroup;
  public nome: any;
  public _id: any;
  public vacina: any;
  public data: any;
  public local: any;
  public agente: any;
  public lote: any;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public usuarioService: UsuarioProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController
  ) {
    this.editarVacinaForm = this.createEditarVacinaForm();

    this.nome = this.navParams.get('nome');
    this._id = this.navParams.get('_id');
    this.vacina = this.navParams.get('vacina');
    this.data = this.navParams.get('data');
    this.local = this.navParams.get('local');
    this.agente = this.navParams.get('agente');
    this.lote = this.navParams.get('lote');

  } 

  createEditarVacinaForm(){
    return this.formBuilder.group({
      data: [''],
      vacina: ['', Validators.required],
      local: ['', Validators.required],
      agente: ['', Validators.required],
      lote: ['', Validators.required],
    });
  }

  updateVacinacao(){

    this.showLoader();
    let { vacina, data, local, agente, lote } = this.editarVacinaForm.value;
    let rv = {
      '_id': this._id,
      'vacina': vacina,
      'data': (data === "")? this.data : data,
      'local': local,
      'agente': agente,
      'lote': lote
    }
    this.usuarioService.updateVacinacaoPet(rv).subscribe( data => {
        this.res = data;
        this.loading.dismiss();
        this.presentToast(this.res.msg);
        this.dismiss();     
      }, err => {
        this.loading.dismiss();
        this.presentToast(err);
    });       
  }

  confirmDelete() {
    const confirm = this.alertCtrl.create({
      //title: 'Deseja apagar registro de vacinação?',
      message: 'Deseja apagar registro de vacinação de pet?',
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
              let rv = {
                '_id': this._id
              }
              this.usuarioService.deleteVacinacaoPet(rv)
                .subscribe( data => {
                  this.loading.dismiss();
                  this.res = data;
                  this.presentToast(this.res.msg);
                  this.dismiss(); 
                }, err => {
                  this.loading.dismiss();
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

}
