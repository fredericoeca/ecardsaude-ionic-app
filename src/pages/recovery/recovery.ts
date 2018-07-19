import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-recovery',
  templateUrl: 'recovery.html',
})
export class RecoveryPage {

  public recoveryForm: FormGroup;
  public loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.recoveryForm = this.createRecoveryForm();
  }

  private createRecoveryForm(){
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), 
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), 
        Validators.required])],
        tipo_sanguineo: ['', Validators.required],
        nascimento: ['', Validators.required]
    });
  }

  recovery(){
    this.showLoader();
    let { email, tipo_sanguineo, nascimento } = this.recoveryForm.value;
    let usuario = {
      'email': email,
      'tipo_sanguineo': tipo_sanguineo,
      'nascimento': new Date(nascimento).toISOString()
    }
    this.authService.recovery(usuario)
      .subscribe(data => {
        this.loading.dismiss();
        this.presentToast(data.msg);
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

  goToBack(){
    this.navCtrl.pop();
  }

}
