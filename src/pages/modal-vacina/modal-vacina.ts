import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-vacina',
  templateUrl: 'modal-vacina.html',
})
export class ModalVacinaPage {

  vacina: any;
  dose: any;
  descricao: any;
  idade: any;
  grupoAlvo: any;
  contraIndicacao: any;
  possiveisReacoes: any;
  publica: any;
  privada: any;
  pni: any;
  observacoes: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.vacina = navParams.get('vacina');
    this.dose = navParams.get('dose');
    this.descricao = navParams.get('descricao');
    this.idade = navParams.get('idade');
    this.grupoAlvo = navParams.get('grupoAlvo');
    this.contraIndicacao = navParams.get('contraIndicacao');
    this.possiveisReacoes = navParams.get('possiveisReacoes');
    this.publica = navParams.get('publica');
    this.privada = navParams.get('privada');
    this.pni = navParams.get('pni');
    this.observacoes = navParams.get('observacoes');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
