import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-cartao-vacina-pet',
  templateUrl: 'cartao-vacina-pet.html',
})
export class CartaoVacinaPetPage {

  public _id: any;
  public nome: any;
  public especie: any;
  public vacinaspet: any;
  public usuario: any;
  public regvacinas: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public usuarioService: UsuarioProvider,
  ) {
    this._id = this.navParams.get('_id');
    this.nome = this.navParams.get('nome');
    this.especie = this.navParams.get('especie');

    this.storage.get('vacinaspet').then( val => {
      this.vacinaspet = val;
    })

    if(navigator.onLine){
      this.usuarioService.getUsuario()
        .subscribe( data => {
          this.usuario = data;
          this.regvacinas = this.usuario.registro_vacinas_pet;
        })
    } else {
      this.storage.get('usuario').then( val => {
        this.usuario = val;
        this.regvacinas = this.usuario.registro_vacinas_pet;
      })
    }

  }



  
}
