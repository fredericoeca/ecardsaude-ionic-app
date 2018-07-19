import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { ModalRegVacUsuPage } from '../modal-reg-vac-usu/modal-reg-vac-usu';
import { CartaoVacinaFamiliarPage } from '../cartao-vacina-familiar/cartao-vacina-familiar';
import { ModalEditFamiliarPage } from '../modal-edit-familiar/modal-edit-familiar';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ControleVacinasPage } from '../controle-vacinas/controle-vacinas';
import { ModalRegFamiliarPage } from '../modal-reg-familiar/modal-reg-familiar';

@IonicPage()
@Component({
  selector: 'page-familiares',
  templateUrl: 'familiares.html',
})
export class FamiliaresPage {

  public familiares: any;
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
            this.familiares = this.res.familiar;
            this.storage.set('usuario', data);
            console.log('connected');
        })
    } else {
        this.storage.get('usuario').then( val => {
            this.familiares = val.familiar;
            console.log('desconnected');
        })
    }
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

  goToModalRegVac(familiar){
    if(navigator.onLine){
        let myModal = this.modalCtrl.create(ModalRegVacUsuPage, {
            '_id': familiar._id,
            'nome': familiar.nome
        })
        myModal.onDidDismiss(() => {        
            this.usuarioService.getUsuario().subscribe( data => {
                this.res = data;
                this.familiares = this.res.familiar;
                this.storage.set('usuario', data);
            })
        });
        myModal.present();
    } else {
        this.presentToast('Sem conexão com a internet!');
    }
  }

  goToCartaoVacina(f){
    this.navCtrl.push(CartaoVacinaFamiliarPage, {
        '_id': f._id,
        'nome': f.nome,
        'parentesco': f.parentesco,
        'nascimento': f.nascimento,
        'tipo_sanguineo': f.tipo_sanguineo,
        'genero': f.genero
    });
  }

  goToModalEdtFam(f){
    if(navigator.onLine){  
        let myModal = this.modalCtrl.create(ModalEditFamiliarPage, {
            '_id': f._id,
            'nome': f.nome,
            'parentesco': f.parentesco,
            'nascimento': f.nascimento,
            'tipo_sanguineo': f.tipo_sanguineo,
            'genero': f.genero
        });
        myModal.onDidDismiss(() => {        
            this.usuarioService.getUsuario().subscribe( data => {
                this.res = data;
                this.familiares = this.res.familiar;
                this.storage.set('usuario', data);
            })
        });
        myModal.present();
    } else {
        this.presentToast('Sem conexão com a internet!');
    }
  }

  goToControleVacina(f){
    this.navCtrl.push(ControleVacinasPage, {
        '_id': f._id
    })
  }

  goToRegisterFamiliar(){
    if(navigator.onLine){
        let myModal = this.modalCtrl.create(ModalRegFamiliarPage);
        myModal.onDidDismiss(() => {        
            this.usuarioService.getUsuario().subscribe( data => {
                this.res = data;
                this.familiares = this.res.familiar;
                this.storage.set('usuario', data);
            })
        });
        myModal.present();
    } else {
        this.presentToast('Sem conexão com a internet!');
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

}
