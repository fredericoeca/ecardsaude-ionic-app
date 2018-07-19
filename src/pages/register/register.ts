import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public municipios;
  public cidadesPorUf;
  public registerForm: FormGroup;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authSevice: AuthProvider
  ) {

    this.registerForm = this.createRegisterForm();

    this.storage.get('municipios').then( val => {
      this.municipios = val;
    })
    
  }

  clickOption(estado){
    for(let i=0; i<this.municipios.length; i++){
      if(estado === this.municipios[i]){
        this.cidadesPorUf = this.municipios[i].cidades;
      }
    }
  }

  createRegisterForm(){
    return this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.compose([Validators.maxLength(70), 
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), 
        Validators.required])],
      nascimento: ['', Validators.required],
      tipo_sanguineo: ['', Validators.required],
      genero: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
        Validators.required])],
      conf_senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
        Validators.required])]
    });
  }

  save(){

    this.showLoader();  
    let {
      nome, email, nascimento, tipo_sanguineo, genero, estado, cidade, senha, conf_senha
    } = this.registerForm.value;
        
    if(senha !== conf_senha){
      this.presentToast('Senha não confere com a confirmação!');
    } else {
      let usuario = {
        'nome': nome,
        'email': email,
        'nascimento': new Date(nascimento).toISOString(),
        'tipo_sanguineo': tipo_sanguineo,
        'genero': genero,
        'estado': estado,
        'cidade': cidade,
        'senha': senha
      }
      this.authSevice.registerUser(usuario)
      .subscribe( data => {
        this.loading.dismiss();
        this.res = data;
        if(this.res.cod === 304){
          this.presentToast(this.res.msg);
          this.navCtrl.push(LoginPage);
        } else {
          this.presentToast(this.res.msg);
        }
      }, err => {
        this.presentToast(err);
        this.loading.dismiss();
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