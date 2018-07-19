import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';


import 'rxjs/add/operator/map';
import { ModalVacinaPage } from '../modal-vacina/modal-vacina';

@IonicPage()
@Component({
  selector: 'page-vacinas',
  templateUrl: 'vacinas.html',
})
export class VacinasPage {

  public vacinas: any;
  public token: any;
  public grupo: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public authService: AuthProvider,
    public http: Http,
    public modalCtrl: ModalController
  ) {
    this.storage.get('token').then(val => {
      this.token = val;
    })

    this.grupo = 'Criança';

    this.storage.get('vacinas').then(val => {
        this.vacinas = val;
    })
  }

  ionViewCanEnter(){
    return this.authService.userIsLogged();
  }
  
  exIdade(vacina){
      if(vacina.idadeInicialMes === 0 && vacina.idadeFinalMes === 0 && vacina.idadeInicialAno === 0 && vacina.idadeFinalAno === 0){
        return 'Ao nascer';
    } else if(vacina.idadeInicialAno === 0 && vacina.idadeFinalAno === 0 && vacina.idadeInicialMes !== vacina.idadeFinalMes){
        return vacina.idadeInicialMes + ' à ' + vacina.idadeFinalMes + ' meses';
    } else if(vacina.idadeInicialAno === 0 && vacina.idadeFinalAno === 0 && vacina.idadeInicialMes === vacina.idadeFinalMes){
        if(vacina.idadeInicialMes === 1) {
            return vacina.idadeInicialMes + ' mês';
        } else {
            return vacina.idadeInicialMes + ' meses';
        }
    } else if(vacina.idadeInicialAno === 0 && vacina.idadeFinalAno !== 0 && vacina.idadeFinalMes === 0) {
        return vacina.idadeInicialMes + ' meses à ' + vacina.idadeFinalAno + ' anos';
    } else {

        if (vacina.idadeInicialAno !== vacina.idadeFinalAno) {
            if (vacina.idadeInicialMes === 0 && vacina.idadeFinalMes === 0) {
                return this.exAno(vacina.idadeInicialAno) + ' à ' + this.exAno(vacina.idadeFinalAno);
            } else if(vacina.idadeInicialMes === 0 && vacina.idadeFinalMes !== 0){
                return this.exAno(vacina.idadeInicialAno) + ' à ' + this.exAno(vacina.idadeFinalAno) + ' e ' + this.exMes(vacina.idadeFinalMes);
            } else if(vacina.idadeInicialMes !== 0 && vacina.idadeFinalMes === 0){
                return this.exAno(vacina.idadeInicialAno) +  ' e ' + this.exMes(vacina.idadeInicialMes) +  ' à ' + this.exAno(vacina.idadeFinalAno);
            } else {
                return this.exAno(vacina.idadeInicialAno) +  ' e ' + this.exMes(vacina.idadeInicialMes) +  ' à ' + this.exAno(vacina.idadeFinalAno) + ' e ' + this.exMes(vacina.idadeFinalMes);
            }
        } else {
            if (vacina.idadeFinalMes === 0) {
                return this.exAno(vacina.idadeInicialAno);
            } else if (vacina.idadeInicialMes === 0 && vacina.idadeFinalMes !== 0) {
                return this.exAno(vacina.idadeInicialAno) + ' à ' + this.exAno(vacina.idadeFinalAno) + ' e ' + this.exMes(vacina.idadeFinalMes);
            } else if (vacina.idadeInicialMes !== 0 && vacina.idadeFinalMes === 0) {
                return this.exAno(vacina.idadeInicialAno) + ' e ' + this.exMes(vacina.idadeInicialMes) + ' à ' + this.exAno(vacina.idadeFinalAno);
            } else if(vacina.idadeInicialMes === vacina.idadeFinalMes && vacina.idadeInicialMes !== 0){
                return this.exAno(vacina.idadeInicialAno) + ' e ' + this.exMes(vacina.idadeInicialMes);
            } else {
                return this.exAno(vacina.idadeInicialAno) +  ' e ' + this.exMes(vacina.idadeInicialMes) +  ' à ' + this.exAno(vacina.idadeFinalAno) + ' e ' + this.exMes(vacina.idadeFinalMes);
            }
        }
    }
  }

  exAno(ano){
      if(ano === 1){
        return ano + ' ano';
    } else {
        return ano + ' anos';
    }
  }

  exMes(mes){
      if(mes === 1){
        return mes + ' mes';
    } else {
        return mes + ' meses';
    }
  }

  openModalVacina(vacina){
    let myModal = this.modalCtrl.create(ModalVacinaPage, {
        'vacina': vacina.vacina,
        'dose': vacina.dose,
        'descricao': vacina.descricao,
        'idade': this.exIdade(vacina),
        'grupoAlvo': vacina.grupoAlvo,
        'contraIndicacao': vacina.contraIndicacao,
        'possiveisReacoes': vacina.possiveisReacoes,
        'publica': vacina.publica,
        'privada': vacina.privada,
        'pni': vacina.pni,
        'observacoes': vacina.observacoes
    });
    myModal.present();
  }    

}
