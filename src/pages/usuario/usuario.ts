import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { ModalSenhaPage } from '../modal-senha/modal-senha';
import { ModalEditUsuarioPage } from '../modal-edit-usuario/modal-edit-usuario';
import { ModalDesativarPage } from '../modal-desativar/modal-desativar';
import { ModalRegVacUsuPage } from '../modal-reg-vac-usu/modal-reg-vac-usu';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  public usuario: any;
  public loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public usuarioService: UsuarioProvider,
    public storage: Storage,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    if(navigator.onLine){
      this.usuarioService.getUsuario().subscribe( data => {     
        this.usuario = data;
        this.storage.set('usuario', data);
        console.log('connected');
      })
    } else {
      this.storage.get('usuario').then( val => {
            this.usuario = val;
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
  
  openModalSenha(){
    if(navigator.onLine){
      let myModal = this.modalCtrl.create(ModalSenhaPage);
      myModal.onDidDismiss(() => {        
        this.usuarioService.getUsuario().subscribe( data => {
        this.usuario = data;
        this.storage.set('usuario', data);
        })
      });
      myModal.present();
    } else {
      this.presentToast('Sem conexão com a internet!');
    }
  }

  openModalEdit(usuario){
    if(navigator.onLine){
      let myModal = this.modalCtrl.create(ModalEditUsuarioPage, {
          '_id': usuario._id,
          'nome': usuario.nome,
          'nascimento': usuario.nascimento,
          'genero': usuario.genero,
          'tipo_sanguineo': usuario.tipo_sanguineo,
          'estado': usuario.estado,
          'cidade': usuario.cidade
      });
      myModal.onDidDismiss(() => {        
        this.usuarioService.getUsuario().subscribe( data => {
            this.usuario = data;
            this.storage.set('usuario', data);
        })
      });
      myModal.present();
    } else {
      this.presentToast('Sem conexão com a internet!');
    }
  }

  openModalDesativar(usuario){
    if(navigator.onLine){
      let myModal = this.modalCtrl.create(ModalDesativarPage, {
        '_id': usuario._id,
        'nome': usuario.nome
      });
      myModal.present();
    } else {
      this.presentToast('Sem conexão com a internet!');
    }    
  }

  goToModalRegVac(usuario) {
    if(navigator.onLine){
        let myModal = this.modalCtrl.create(ModalRegVacUsuPage, {
            '_id': usuario._id,
            'nome': usuario.nome
        })
        myModal.onDidDismiss(() => {        
            this.usuarioService.getUsuario().subscribe( data => {
                this.usuario = data;
                this.storage.set('usuario', data);
            })
        });
        myModal.present();
    } else {
        this.presentToast('Sem conexão com a internet!');
    }
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
