import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-modal-edit-usuario',
  templateUrl: 'modal-edit-usuario.html',
})
export class ModalEditUsuarioPage {

  public editUsuarioForm: FormGroup;
  public _id: any;
  public nome: any;
  public email: any;
  public nascimento: any;
  public tipo_sanguineo: any;
  public genero: any;
  public estado: any;
  public cidade: any;
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
    this.editUsuarioForm = this.createEditForm();

    this._id = navParams.get('_id');
    this.nome = navParams.get('nome');
    this.email = navParams.get('email');
    this.nascimento = navParams.get('nascimento');
    this.tipo_sanguineo = navParams.get('tipo_sanguineo');
    this.genero = navParams.get('genero');
    this.estado = navParams.get('estado');
    this.cidade = navParams.get('cidade');
  }

  createEditForm(){
    return this.formBuilder.group({
      nome: ['', Validators.required],
      nascimento: [''],
      genero: [''],
      tipo_sanguineo: [''],
      estado: ['', Validators.required],
      cidade: ['', Validators.required]
    });
  }

  edit(){ 
    
    this.showLoader();
    let{ nome, nascimento, genero, tipo_sanguineo, estado, cidade } = this.editUsuarioForm.value;
    let usuario = {
      '_id': this._id,
      'nome': nome,
      'nascimento': (nascimento === "")? this.nascimento : nascimento,
      'genero': (genero === "")? this.genero : genero,
      'tipo_sanguineo': (tipo_sanguineo === "")? this.tipo_sanguineo : tipo_sanguineo,      
      'estado': estado,
      'cidade': cidade
    }
    this.usuarioService.updateUsuario(usuario)
      .subscribe( data => {
        this.loading.dismiss();
        this.res = data;
        this.presentToast(this.res.msg);
        this.dismiss();
      }, err => {
        this.loading.dismiss();
        this.presentToast(err);
      })
    
  }

  delete() {
    const confirm = this.alertCtrl.create({
      //title: 'Deseja apagar registro de vacinação?',
      message: 'Deseja apagar sua conta?',
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
              this.usuarioService.deleteUsuario(this._id).subscribe( data => {
                this.loading.dismiss();
                this.res = data;
                this.presentToast(this.res.msg);
                this.logout();
              }, err => {
                this.loading.dismiss();
                this.presentToast(err);
              })
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

  logout(){
    this.navCtrl.push(LoginPage);
    this.storage.clear;
  }
}
