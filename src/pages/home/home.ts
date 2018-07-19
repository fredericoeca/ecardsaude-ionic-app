import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { FamiliaresPage } from '../familiares/familiares';
import { VacinaPendentePage } from '../vacina-pendente/vacina-pendente';
import { CartaoVacinaPage } from '../cartao-vacina/cartao-vacina';
import { ControleVacinasPage } from '../controle-vacinas/controle-vacinas';
import { NotificacoesPage } from '../notificacoes/notificacoes';
import { UsuarioPage } from '../usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuario: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public storage: Storage,
    public modalCtrl: ModalController
  ) {
    this.storage.get('usuario').then(val => {
      this.usuario = val;
    })

    this.authService.getVacines()
      .subscribe((val) => {
        this.storage.set('vacinas', val);
      })

    this.authService.getVacinesPet()
      .subscribe((val) => {
        this.storage.set('vacinaspet', val);
      })
  }

  ionViewCanEnter() {
    return this.authService.userIsLogged();
  }

  goToFamiliar(){
    this.navCtrl.push(FamiliaresPage);
  }

  goToVacPend(){
      this.navCtrl.push(VacinaPendentePage);
  }

  goToCartaoVacina(){
      this.navCtrl.push(CartaoVacinaPage);
  }

  goToNotificacoes(usuario){
      this.navCtrl.push(NotificacoesPage, {
          '_id': usuario._id,
          'email': usuario.email,
          'cidade': usuario.cidade,
          'estado': usuario.estado
      });
  }

  goToContVacinas(usuario){
      this.navCtrl.push(ControleVacinasPage, {
          '_id': usuario._id  
      });
  }

  goToPerfil(){
      this.navCtrl.push(UsuarioPage);
  }

}
