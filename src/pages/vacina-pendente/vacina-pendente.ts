import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
//import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { Storage } from '@ionic/storage';
import { ModalRegVacUsuPage } from '../modal-reg-vac-usu/modal-reg-vac-usu';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-vacina-pendente',
  templateUrl: 'vacina-pendente.html',
})
export class VacinaPendentePage {

  public vacinas: any;
  public usuario: any;
  public selecao: any;
  public familiares: any;
  public loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public usuarioService: UsuarioProvider
  ) {

    if(navigator.onLine){
        this.usuarioService.getUsuario()
            .subscribe( data => {
                this.usuario = data;
                this.storage.set('usuario', this.usuario);
                console.log('connected');
            })
    } else {   
        this.storage.get('usuario').then(val => {
            this.usuario = val;
            console.log('disconnected');
        })
    }

    this.storage.get('vacinas').then(val => {
      this.vacinas = val;
    })

    this.selecao = 'usuario';
  }

  alerta(idade, vacina, p) {
    var anoi = idade[0];
    var mesi = idade[1];
    var is = false;

    if(vacina.grupoAlvo !== 'Gestante') {
      if(this.isRegistro(vacina, p) === false) {
          if(anoi < vacina.idadeInicialAno){
              is = false;
          } else if(anoi === vacina.idadeInicialAno && mesi <= vacina.idadeInicialMes){
              is = false;
          } else {
              if(vacina.vacina === 'HPV'){
                  return this.verificaGeneroHPV(vacina, p);
              } else {
                  return true;
              }
          }
      }
    }

    return is;
  }

  verificaGeneroHPV(vacina, p){
    var is = false;
      if(vacina.dose.indexOf('Meninos') !== -1 && p.genero === "Masculino"){
          is = true;
      } else if(vacina.dose.indexOf('Meninas') !== -1 && p.genero === "Feminino"){
          is = true;
      } else {
          return false;
      }
      return is;
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
        meses = meses - 1;
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

  isRegistro(vacina, p) {
    var is = false;
    for(var i=0; i < this.usuario.registro_vacinas.length; i++){

        if(p._id === this.usuario.registro_vacinas[i].paciente) {
            if (vacina.vacina === this.usuario.registro_vacinas[i].vacina && vacina.dose ===  this.usuario.registro_vacinas[i].dose) {
                return true;
            } else {
                is = false;
            }
        }
    }
    return is;
  }

  goToModalRegVac(p, v) {
    if(navigator.onLine){
        let myModal = this.modalCtrl.create(ModalRegVacUsuPage, {
            '_id': p._id,
            'nome': p.nome,
            'vacina': v.vacina,
            'dose': v.dose
        })
        myModal.onDidDismiss(() => {        
            this.usuarioService.getUsuario().subscribe( data => {
                this.usuario = data;
                this.storage.set('usuario', data);
            })
          });
        myModal.present();
    } else {
        this.presentToast('Sem conexão com internet!');
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
