import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ModalRegPetPage } from '../modal-reg-pet/modal-reg-pet';
import { ModalEditPetPage } from '../modal-edit-pet/modal-edit-pet';
import { CartaoVacinaPetPage } from '../cartao-vacina-pet/cartao-vacina-pet';
import { ControleVacinaPetPage } from '../controle-vacina-pet/controle-vacina-pet';

@IonicPage()
@Component({
  selector: 'page-pets',
  templateUrl: 'pets.html',
})
export class PetsPage {

  public pets: any;
  public loading: any;
  public res: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthProvider,
    public storage: Storage,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public usuarioService: UsuarioProvider
  ) {

    if(navigator.onLine){
        this.usuarioService.getUsuario()
            .subscribe( data => {
                this.res = data;
                this.pets = this.res.pet;
                this.storage.set('usuario', this.res);
                console.log('connected');
            })
    } else {
        this.storage.get('usuario').then(val => {
            this.pets = val.pet;
        })
    }
  }

  ionViewCanEnter(){
    return this.authService.userIsLogged();
  }

  idade(nascimento) {
    var h = new Date();
    var dh = h.getDate();
    var mh = h.getMonth() + 1;
    var ah = h.getFullYear();

    var n = new Date(nascimento);    
    var da = n.getDate();
    var ma = n.getMonth() + 1;
    var aa = n.getFullYear(); 

    var anos;
    var meses;
    var dias;

    if (ah >= aa) {
        anos = ah - aa;
    }

    if (mh > ma) {
        meses = mh - ma;
    } else if (mh < ma) {
        anos = anos - 1;
        meses = 12 - ma + mh;
    } else {
        meses = 0;
    }

    if (dh >= da) {
        dias = dh - da;
    } else {
      if(meses !== 0) {
        meses = meses - 1;
      } else {
        anos = anos - 1;
        meses = 12 - ma + mh - 1;
    }
        if ((mh - 1) === 2) {
            if ((ah % 4 === 0) && (ah % 100 !== 0) || (ah % 400 === 0)) {
                dias = 29 - da + dh;
            } else {
                dias = 28 - da + dh;
            }
        } else if ((mh - 1) === 4 || (mh - 1) === 6 || (mh - 1) === 9 || (mh - 1) === 11) {
            dias = 30 - da + dh;
        } else {
            dias = 31 - da + dh;
        }
    }

    return [anos, meses, dias];
  }

  exIdade(nascimento){
    var vIdade = this.idade(nascimento);
      var ano;
      var mes;
      var dia;

      if (vIdade[0] === 1) {
          ano = vIdade[0] + ' ano, ';
      } else {
          ano = vIdade[0] + ' anos, ';
      }

      if (vIdade[1] === 1) {
          mes = vIdade[1] + ' mês, ';
      } else {
          mes = vIdade[1] + ' meses, ';
      }

      if (vIdade[2] === 1) {
          dia = vIdade[2] + ' dia.';
      } else {
          dia = vIdade[2] + ' dias.';
      }

      return ano + mes + dia;
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

  goToModalEdtPet(p){
    if(navigator.onLine){  
        let myModal = this.modalCtrl.create(ModalEditPetPage, {
            '_id': p._id,
            'nome': p.nome,
            'especie': p.especie,
            'raca': p.raca,
            'nascimento': p.nascimento,
            'sexo': p.sexo
        });
        myModal.onDidDismiss(() => {        
            this.usuarioService.getUsuario().subscribe( data => {
                this.res = data;
                this.pets = this.res.pet;
                this.storage.set('usuario', data);
            })
        });
        myModal.present();
    } else {
        this.presentToast('Sem conexão com a internet!');
    }
  }

  goToControleVacina(pet){
    this.navCtrl.push(ControleVacinaPetPage, {
        '_id': pet._id
    });
  }

  goToCartaoVacina(pet){
    this.navCtrl.push(CartaoVacinaPetPage, {
        '_id': pet._id,
        'nome': pet.nome,
        'especie': pet.especie
    });
  }

  goToRegPet(){
    if(navigator.onLine){  
        let myModal = this.modalCtrl.create(ModalRegPetPage);
        myModal.onDidDismiss(() => {        
            this.usuarioService.getUsuario().subscribe( data => {
                this.res = data;
                this.pets = this.res.pet;
                this.storage.set('usuario', data);
            })
        });
        myModal.present();
    } else {
        this.presentToast('Sem conexão com a internet!');
    }
  }
}
