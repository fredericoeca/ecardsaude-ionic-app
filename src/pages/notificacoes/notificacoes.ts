import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-notificacoes',
  templateUrl: 'notificacoes.html',
})
export class NotificacoesPage {

  public notificacoes: any;
  public municipios: any;
  public usuario: any;
  public loading: any;
  public email: any;
  public id: any;
  public cidade: any;
  public estado: any;
  public locais: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public notificationProvider: NotificationProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.storage.get('municipios').then( val1 => {
      this.municipios = val1; 
    })
    
    this.id = this.navParams.get('_id');
    this.email = this.navParams.get('email')
    this.cidade = this.navParams.get('cidade');
    this.estado = this.navParams.get('estado');

    this.getNotification();

    this.locais = [
      { regiao: 'Norte', estado: 'Acre', uf: 'AC' },{ regiao: 'Norte', estado: 'Amapá', uf: 'AP' },
      { regiao: 'Norte', estado: 'Amazonas', uf: 'AM' },{ regiao: 'Norte', estado: 'Pará', uf: 'PA' },
      { regiao: 'Norte', estado: 'Rondônia', uf: 'RO' },{ regiao: 'Norte', estado: 'Roraima', uf: 'RR' },
      { regiao: 'Norte', estado: 'Tocantins', uf: 'TO' },{ regiao: 'Nordeste', estado: 'Alagoas', uf: 'AL' },
      { regiao: 'Nordeste', estado: 'Bahia', uf: 'BA' },{ regiao: 'Nordeste', estado: 'Ceará', uf: 'CE' },
      { regiao: 'Nordeste', estado: 'Maranhão', uf: 'MA' },{ regiao: 'Nordeste', estado: 'Paraíba', uf: 'PB' },
      { regiao: 'Nordeste', estado: 'Pernambuco', uf: 'PE' },{ regiao: 'Nordeste', estado: 'Piauí', uf: 'PI' },
      { regiao: 'Nordeste', estado: 'Rio Grande do Norte', uf: 'RN' },{ regiao: 'Nordeste', estado: 'Sergipe', uf: 'SE' },
      { regiao: 'Centro-Oeste', estado: 'Goiás', uf: 'GO' },{ regiao: 'Centro-Oeste', estado: 'Mato Grosso do Sul', uf: 'MS' },
      { regiao: 'Centro-Oeste', estado: 'Mato Grosso', uf: 'MT' },{ regiao: 'Centro-Oeste', estado: 'Distrito Federal', uf: 'DF' },
      { regiao: 'Sudeste', estado: 'Espírito Santo', uf: 'ES' },{ regiao: 'Sudeste', estado: 'Minas Gerais', uf: 'MG' },
      { regiao: 'Sudeste', estado: 'São Paulo', uf: 'SP' },{ regiao: 'Sudeste', estado: 'Rio de Janeiro', uf: 'RJ' },
      { regiao: 'Sul', estado: 'Paraná', uf: 'PR' },{ regiao: 'Sul', estado: 'Santa Catarina', uf: 'SC' },
      { regiao: 'Sul', estado: 'Rio Grande do Sul', uf: 'RS' }
    ]
  }

  getNotification(){
    if(navigator.onLine){
      this.notificationProvider.getNotifications().subscribe( data => {
        this.notificacoes = data;
        this.storage.set('notificacoes', this.notificacoes);
        console.log('connected');
      })
    } else {
      this.storage.get('notificacoes').then( data => {
        this.notificacoes = data;
        console.log('disconnected');
      })
    }
  }
  
  localizacao(notification){
    let is = false;
   
    if(notification.regiao === this.cidade || notification.regiao === 'Brasil'){
      return true;
    } else {
      for(let loc in this.locais){
        if(this.locais[loc].uf === this.estado){
          if(this.locais[loc].regiao === notification.regiao || this.locais[loc].estado === notification.regiao){
            return true;
          }
        }
      }
    }
    return is;
  }

  like(_id){
    if(navigator.onLine){
      let notification = {
        '_id' : _id,
        'email' : this.email
      }

      this.notificationProvider.like(notification)
        .subscribe( data => {
          console.log(data);
          this.getNotification();
        })
    } else {
      this.presentToast('Sem conexão com a internet!');
    }
  }

  unlike(_id){
    if(navigator.onLine){
      let notification = {
        '_id' : _id,
        'email' : this.email
      }

      this.notificationProvider.unlike(notification)
        .subscribe( data => {
          console.log(data);
          this.getNotification();
        })
    } else {
      this.presentToast('Sem conexão com a internet!');
    }
  }

  islike(notification){
    let is = false;
    for(let n in notification.curtidas){
      if(notification.curtidas[n].email === this.email){
        return true;
      } else {
        is = false;
      }
    }    
    return is;
  }

  countLike(notification){
    let c = 0;
    for(let n in notification.curtidas){
      n = n;
      c++;
    }    
    return c;
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
