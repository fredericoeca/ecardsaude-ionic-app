import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-cartao-vacina',
  templateUrl: 'cartao-vacina.html',
})
export class CartaoVacinaPage {

  public vacinas: any;
  public grupo: any;
  public usuario: any;
  public vacinacao: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public authService: AuthProvider
  ) {

    this.storage.get('usuario').then( val => {
      this.usuario = val;
    })

    this.storage.get('vacinas').then( val => {
      this.vacinas = val;
    })

    this.grupo = 'Criança';
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

  isRegistro(vacina, p) {
    var is = false;

    for(var i=0; i < this.usuario.registro_vacinas.length; i++){

        if(p._id === this.usuario.registro_vacinas[i].paciente) {
            if (vacina.vacina ===  this.usuario.registro_vacinas[i].vacina && vacina.dose ===  this.usuario.registro_vacinas[i].dose) {
                return true;
            } else {
                is = false;
            }
        }
    }
    return is;
  }

  emDia(vacina, p) {
    var is = false;
    var age = this.idade(p.nascimento);

    if(age[0] > vacina.idadeFinalAno){
        is = false;
    } else if(age[0] === vacina.idadeFinalAno && age[1] > vacina.idadeFinalMes){
        is = false;
    }  else {
        return true;
    }

    return is;
  }

  idade(nascimento){
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
  
}
