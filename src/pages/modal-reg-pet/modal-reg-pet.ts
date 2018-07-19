import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-modal-reg-pet',
  templateUrl: 'modal-reg-pet.html',
})
export class ModalRegPetPage {

  public regPetForm: FormGroup;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {

    this.regPetForm = this.createRegFormPet();
  }

  createRegFormPet(){
    return this.formBuilder.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      nascimento: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  registerPet(){
    this.showLoader()
    let { nome, especie, raca, nascimento, sexo } = this.regPetForm.value;
    let pet = {
      'nome': nome,
      'especie': especie,
      'raca': raca,
      'nascimento': nascimento,
      'sexo': sexo
    }
    this.usuarioService.registerPet(pet)
      .subscribe( data => {
        this.loading.dismiss();
        this.res = data;
        this.presentToast(this.res.msg);
        this.dismiss();
      }, err => {
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
