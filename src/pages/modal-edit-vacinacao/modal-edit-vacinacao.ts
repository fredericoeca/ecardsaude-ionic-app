import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-modal-edit-vacinacao',
  templateUrl: 'modal-edit-vacinacao.html',
})
export class ModalEditVacinacaoPage {

  public editarVacinaForm: FormGroup;
  public nome: any;
  public _id: any;
  public vacina: any;
  public dose: any;
  public data: any;
  public local: any;
  public agente: any;
  public lote: any;
  public rede: any;
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
    this.dose = this.navParams.get('dose');
    this.data = this.navParams.get('data');
    this.local = this.navParams.get('local');
    this.agente = this.navParams.get('agente');
    this.lote = this.navParams.get('lote');
    this.rede = this.navParams.get('rede');

  } 

  createEditarVacinaForm(){
    return this.formBuilder.group({
      data: [''],
      vacina: ['', Validators.required],
      dose: ['', Validators.required],
      local: ['', Validators.required],
      agente: ['', Validators.required],
      lote: ['', Validators.required],
      rede: ['', Validators.required]
    });
  }

  //new Date(nascimento).toISOString()
  updateVacinacao(){

    this.showLoader();
    let { vacina, dose, data, local, agente, lote, rede } = this.editarVacinaForm.value;
    let rv = {
      '_id': this._id,
      'vacina': vacina,
      'dose': dose,
      'data': (data === "")? this.data : data,
      'local': local,
      'agente': agente,
      'lote': lote,
      'rede': rede
    }
    this.usuarioService.updateVacinacao(rv).subscribe( data => {
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
      message: 'Deseja apagar registro de vacinação?',
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
              this.usuarioService.deleteVacinacao(rv)
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
