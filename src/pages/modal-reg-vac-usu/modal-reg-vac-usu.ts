import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-modal-reg-vac-usu',
  templateUrl: 'modal-reg-vac-usu.html',
})
export class ModalRegVacUsuPage {

  public registroVacinaForm: FormGroup;
  public nome: any;
  public _id: any;
  public vacina: any;
  public dose: any;
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
    public viewCtrl: ViewController
  ) {

    this.registroVacinaForm = this.createRegistroVacinaForm();

    this.nome = this.navParams.get('nome');
    this._id = this.navParams.get('_id');
    this.vacina = this.navParams.get('vacina');
    this.dose = this.navParams.get('dose');
  }

  createRegistroVacinaForm(){
    return this.formBuilder.group({
      data: ['', Validators.required],
      vacina: ['', Validators.required],
      dose: ['', Validators.required],
      local: ['', Validators.required],
      agente: ['', Validators.required],
      lote: ['', Validators.required],
      rede: ['', Validators.required]
    });
  }

  insert() {

    this.showLoader();

    let { data, vacina, dose, local, agente, lote, rede } = this.registroVacinaForm.value;

    let registro = {
      'paciente': this._id,
      'data': data,
      'vacina' : vacina,
      'dose': dose,
      'local': local,
      'agente': agente,
      'lote': lote,
      'rede': rede
    }

    this.usuarioService.registerVacinacao(registro).subscribe( data => {
        this.loading.dismiss();
        this.res = data;
        this.presentToast(this.res.msg);
        this.dismiss();
      }, err => {
        this.loading.dismiss();
        this.presentToast(err);
    });   
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
