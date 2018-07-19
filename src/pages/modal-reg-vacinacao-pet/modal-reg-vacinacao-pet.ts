import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-modal-reg-vacinacao-pet',
  templateUrl: 'modal-reg-vacinacao-pet.html',
})
export class ModalRegVacinacaoPetPage {

  public registrarVacinaForm: FormGroup;
  public pet: any;
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
    this.registrarVacinaForm = this.createRegistrarVacinaForm();

    this.pet = this.navParams.get('pet');
  }

  createRegistrarVacinaForm(){
    return this.formBuilder.group({
      data: ['', Validators.required],
      vacina: ['', Validators.required],
      local: ['', Validators.required],
      agente: ['', Validators.required],
      lote: ['', Validators.required],
    });
  }

  registrarVacinacao(){

    this.showLoader();
    let { vacina, data, local, agente, lote } = this.registrarVacinaForm.value;
    let rv = {
      'pet': this.pet,
      'vacina': vacina,
      'data': data,
      'local': local,
      'agente': agente,
      'lote': lote
    }
    this.usuarioService.registerVacinacaoPet(rv).subscribe( data => {
        this.res = data;
        this.loading.dismiss();
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
