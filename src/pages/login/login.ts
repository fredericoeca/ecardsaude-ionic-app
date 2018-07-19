import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';
import { RecoveryPage } from '../recovery/recovery';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public usuario: any;
  public loading: any;
  public municipios: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthProvider,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    
  ) {
    this.loginForm = this.createLoginForm();

    this.authService.getMunicipios().subscribe( val => {
      this.municipios = val;
      this.storage.set('municipios', val);
    })
  }

  private createLoginForm(){
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), 
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), 
        Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
        Validators.required])]
    });
  }

  login(){

    this.showLoader();

    let { email, senha} = this.loginForm.value;
    let credentials = {
      'email': email,
      'senha': senha
    }
    this.authService.login(credentials).subscribe((data) => {
      
      this.loading.dismiss();      
      this.usuario = data;
      this.storage.set('token', this.usuario.token);
      this.storage.set('usuario', this.usuario);
      
      if(!this.usuario.token){
        this.presentToast(this.usuario.msg);
      } else {        
        this.navCtrl.setRoot(HomePage);
      }      
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    }); 
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Autenticando...'
    });

    this.loading.present();
  }

  showAlert(msg) {
    const alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  goToCadastrar() {
    this.navCtrl.push(RegisterPage);
  }

  goToRecovery(){
    this.navCtrl.push(RecoveryPage);
  }

  goToHome(){
    this.navCtrl.push(HomePage);
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


}
