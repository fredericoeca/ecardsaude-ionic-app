import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage'; 

@IonicPage()
@Component({
  selector: 'page-modal-edit-familiar',
  templateUrl: 'modal-edit-familiar.html',
})
export class ModalEditFamiliarPage {

  public familiar: any;
  public editFamiliarForm: FormGroup;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public usuarioService: UsuarioProvider,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {
    this.editFamiliarForm = this.createEditFamiliarForm();
    this.familiar = {
      '_id': this.navParams.get('_id'),
      'nome': this.navParams.get('nome'),
      'parentesco': this.navParams.get('parentesco'),
      'nascimento': this.navParams.get('nascimento'),
      'tipo_sanguineo': this.navParams.get('tipo_sanguineo'),
      'genero': this.navParams.get('genero')
    }      
  }

  createEditFamiliarForm(){
    return this.formBuilder.group({
      nome: ['', Validators.required],
      parentesco: ['', Validators.required],
      nascimento: [''],
      tipo_sanguineo: [''],
      genero: ['']
    });
  }

  updateFamiliar(){
    this.showLoader();
    let { nome, parentesco, nascimento, tipo_sanguineo, genero } = this.editFamiliarForm.value;
    
    let f = {
      '_id': this.familiar._id,
      'nome': nome,
      'parentesco': parentesco,
      'nascimento': (nascimento === "")? this.familiar.nascimento : nascimento,
      'tipo_sanguineo': (tipo_sanguineo === "")? this.familiar.tipo_sanguineo : tipo_sanguineo,
      'genero': (genero === "")? this.familiar.genero : genero
    }
    this.usuarioService.updateFamiliar(f)
    .subscribe(data => {
      console.log(data);
      this.res = data;
      this.loading.dismiss();
      this.presentToast(this.res.msg);
      this.dismiss();  
    }, err => {
      this.presentToast(err);
      })
  }

  delFamiliar() {
    const confirm = this.alertCtrl.create({
      //title: 'Deseja apagar registro de vacinação?',
      message: 'Deseja apagar registro do familiar?',
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
              this.usuarioService.deleteFamiliar(this.familiar)
                .subscribe( data => {
                  this.loading.dismiss();
                  this.res = data;
                  this.presentToast(this.res.msg);
                  this.dismiss();
                }, err => {
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

}
