import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-modal-senha',
  templateUrl: 'modal-senha.html',
})
export class ModalSenhaPage {

  public changePasswordForm: FormGroup;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public usuarioService: UsuarioProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController

  ) {
    this.changePasswordForm = this.createChangePasswordForm();
  }

  private createChangePasswordForm(){
    return this.formBuilder.group({
      senhaAtual: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
        Validators.required])],
      novaSenha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
        Validators.required])],
      confSenha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
        Validators.required])]
    });
  }

  change(){
    this.showLoader();
    let { senhaAtual, novaSenha, confSenha } = this.changePasswordForm.value;

    if(novaSenha !== confSenha){
      this.presentToast('Senha não confere com a confirmação!');
    } else {     

      this.usuarioService.changePassword(senhaAtual, novaSenha).subscribe( data => {
        this.loading.dismiss();
        this.res = data;
        this.presentToast(this.res.msg);
        this.dismiss();
      }, err => {
        this.loading.dismiss();
        this.presentToast(err);
      })
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
      duration: 2000,
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
