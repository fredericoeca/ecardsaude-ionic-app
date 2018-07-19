import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-modal-reg-familiar',
  templateUrl: 'modal-reg-familiar.html',
})
export class ModalRegFamiliarPage {

  public registroFamiliarForm: FormGroup;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public usuarioService: UsuarioProvider
  ) {
    this.registroFamiliarForm = this.createRegistroFamiliarForm();
  }  
 
  createRegistroFamiliarForm(){
    return this.formBuilder.group({
      nome: ['', Validators.required],
      parentesco: ['', Validators.required],
      nascimento: ['', Validators.required],
      tipo_sanguineo: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  registerFamiliar(){

    this.showLoader();

    let { nome, parentesco, nascimento, tipo_sanguineo, genero } = this.registroFamiliarForm.value;

    let f = { 
      'nome': nome,
      'parentesco': parentesco,
      'nascimento': nascimento,
      'tipo_sanguineo': tipo_sanguineo,
      'genero': genero
    }

    this.usuarioService.registerFamiliar(f).subscribe( data => {
      this.loading.dismiss();
      this.res = data;
      this.presentToast(this.res.msg);
      this.dismiss();
    }, err => {
      this.loading.dismiss();
      this.presentToast(err);
      })
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
