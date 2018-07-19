import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-modal-edit-pet',
  templateUrl: 'modal-edit-pet.html',
})
export class ModalEditPetPage {

  public editPetForm: FormGroup;
  public nome: any;
  public especie: any;
  public raca: any;
  public nascimento: any;
  public sexo: any;
  public id: any;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuild: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public usuarioService: UsuarioProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController
  ) {
    this.editPetForm = this.createEditPetForm();

    this.id = this.navParams.get('_id');
    this.nome = this.navParams.get('nome');
    this.especie = this.navParams.get('especie');
    this.raca = this.navParams.get('raca');
    this.nascimento = this.navParams.get('nascimento');
    this.sexo = this.navParams.get('sexo');
  }

  createEditPetForm(){
    return this.formBuild.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      sexo: ['', Validators.required],
      nascimento: ['']
    });
  }

  editPet(){
    this.showLoader();
    let { nome, especie, raca, nascimento, sexo } = this.editPetForm.value;
    let pet = {
      '_id': this.id,
      'nome': nome,
      'especie': especie,
      'raca': raca,
      'sexo': sexo,
      'nascimento': (nascimento === '')? this.nascimento : nascimento
    }
    this.usuarioService.updatePet(pet)
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

  delPet() {
    const confirm = this.alertCtrl.create({
      //title: 'Deseja apagar registro de vacinação?',
      message: 'Deseja apagar registro do pet?',
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
              let pet = {
                '_id': this.id
              }
              this.usuarioService.deletePet(pet)
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
