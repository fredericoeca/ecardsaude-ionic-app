import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CuidadoViagensProvider } from '../../providers/cuidado-viagens/cuidado-viagens';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cuidados-viagens',
  templateUrl: 'cuidados-viagens.html',
})
export class CuidadosViagensPage {

  public cuidados: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cuidadosService: CuidadoViagensProvider,
    public storage: Storage
  ) {

    if(navigator.onLine){
      this.cuidadosService.getCuidados()
        .subscribe( val => {
          this.cuidados = val;
          this.storage.set('cuidados', this.cuidados);
        })
    } else {
      this.storage.get('cuidados').then( val => {
        this.cuidados = val;
      })
    }

  }



}
