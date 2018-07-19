import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { RecoveryPage } from '../pages/recovery/recovery';
import { FamiliaresPage } from '../pages/familiares/familiares';
import { VacinasPage } from '../pages/vacinas/vacinas';
import { ModalVacinaPage } from '../pages/modal-vacina/modal-vacina';
import { ModalSenhaPage } from '../pages/modal-senha/modal-senha';
import { ModalEditUsuarioPage } from '../pages/modal-edit-usuario/modal-edit-usuario';
import { ModalDesativarPage } from '../pages/modal-desativar/modal-desativar';
import { VacinaPendentePage } from '../pages/vacina-pendente/vacina-pendente';
import { CartaoVacinaPage } from '../pages/cartao-vacina/cartao-vacina';
import { ModalRegVacUsuPage } from '../pages/modal-reg-vac-usu/modal-reg-vac-usu';
import { ControleVacinasPage } from '../pages/controle-vacinas/controle-vacinas';
import { ModalEditVacinacaoPage } from '../pages/modal-edit-vacinacao/modal-edit-vacinacao';
import { CartaoVacinaFamiliarPage } from '../pages/cartao-vacina-familiar/cartao-vacina-familiar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ModalEditFamiliarPage } from '../pages/modal-edit-familiar/modal-edit-familiar';
import { PetsPage } from '../pages/pets/pets';
import { ModalRegFamiliarPage } from '../pages/modal-reg-familiar/modal-reg-familiar';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';
import { NotificationProvider } from '../providers/notification/notification';
import { ModalRegPetPage } from '../pages/modal-reg-pet/modal-reg-pet';
import { Network } from '@ionic-native/network';
import { HttpProvider } from '../providers/interceptor-http/interceptor-http';
import { ModalEditPetPage } from '../pages/modal-edit-pet/modal-edit-pet';
import { UsuarioPage } from '../pages/usuario/usuario';
import { CartaoVacinaPageModule } from '../pages/cartao-vacina/cartao-vacina.module';
import { CartaoVacinaFamiliarPageModule } from '../pages/cartao-vacina-familiar/cartao-vacina-familiar.module';
import { ControleVacinasPageModule } from '../pages/controle-vacinas/controle-vacinas.module';
import { FamiliaresPageModule } from '../pages/familiares/familiares.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ModalDesativarPageModule } from '../pages/modal-desativar/modal-desativar.module';
import { ModalEditFamiliarPageModule } from '../pages/modal-edit-familiar/modal-edit-familiar.module';
import { ModalEditPetPageModule } from '../pages/modal-edit-pet/modal-edit-pet.module';
import { ModalEditUsuarioPageModule } from '../pages/modal-edit-usuario/modal-edit-usuario.module';
import { ModalEditVacinacaoPageModule } from '../pages/modal-edit-vacinacao/modal-edit-vacinacao.module';
import { ModalRegFamiliarPageModule } from '../pages/modal-reg-familiar/modal-reg-familiar.module';
import { ModalRegPetPageModule } from '../pages/modal-reg-pet/modal-reg-pet.module';
import { ModalRegVacUsuPageModule } from '../pages/modal-reg-vac-usu/modal-reg-vac-usu.module';
import { ModalSenhaPageModule } from '../pages/modal-senha/modal-senha.module';
import { ModalVacinaPageModule } from '../pages/modal-vacina/modal-vacina.module';
import { NotificacoesPageModule } from '../pages/notificacoes/notificacoes.module';
import { PetsPageModule } from '../pages/pets/pets.module';
import { UsuarioPageModule } from '../pages/usuario/usuario.module';
import { RecoveryPageModule } from '../pages/recovery/recovery.module';
import { VacinaPendentePageModule } from '../pages/vacina-pendente/vacina-pendente.module';
import { VacinasPageModule } from '../pages/vacinas/vacinas.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { CartaoVacinaPetPageModule } from '../pages/cartao-vacina-pet/cartao-vacina-pet.module';
import { CartaoVacinaPetPage } from '../pages/cartao-vacina-pet/cartao-vacina-pet';
import { ModalEditVacinacaoPetPageModule } from '../pages/modal-edit-vacinacao-pet/modal-edit-vacinacao-pet.module';
import { ModalEditVacinacaoPetPage } from '../pages/modal-edit-vacinacao-pet/modal-edit-vacinacao-pet';
import { ControleVacinaPetPage } from '../pages/controle-vacina-pet/controle-vacina-pet';
import { ControleVacinaPetPageModule } from '../pages/controle-vacina-pet/controle-vacina-pet.module';
import { ModalRegVacinacaoPetPageModule } from '../pages/modal-reg-vacinacao-pet/modal-reg-vacinacao-pet.module';
import { ModalRegVacinacaoPetPage } from '../pages/modal-reg-vacinacao-pet/modal-reg-vacinacao-pet';
import { VacinasPetPage } from '../pages/vacinas-pet/vacinas-pet';
import { VacinasPetPageModule } from '../pages/vacinas-pet/vacinas-pet.module';
import { CuidadoViagensProvider } from '../providers/cuidado-viagens/cuidado-viagens';
import { CuidadosViagensPage } from '../pages/cuidados-viagens/cuidados-viagens';
import { CuidadosViagensPageModule } from '../pages/cuidados-viagens/cuidados-viagens.module';

@NgModule({
  declarations: [
    MyApp,    
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot({
      name: 'db_evacina',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    CartaoVacinaPageModule,
    CartaoVacinaFamiliarPageModule,
    ControleVacinasPageModule,
    FamiliaresPageModule,
    LoginPageModule,
    ModalDesativarPageModule,
    ModalEditFamiliarPageModule,
    ModalEditPetPageModule,
    ModalEditUsuarioPageModule,
    ModalEditVacinacaoPageModule,
    ModalRegFamiliarPageModule,
    ModalRegPetPageModule,
    ModalRegVacUsuPageModule,
    ModalSenhaPageModule,
    ModalVacinaPageModule,
    NotificacoesPageModule,
    PetsPageModule,
    UsuarioPageModule,
    RecoveryPageModule,
    VacinaPendentePageModule,
    VacinasPageModule,
    RegisterPageModule,
    CartaoVacinaPetPageModule,
    ModalEditVacinacaoPetPageModule,
    ControleVacinaPetPageModule,
    ModalRegVacinacaoPetPageModule,
    VacinasPetPageModule,
    CuidadosViagensPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    RecoveryPage,
    FamiliaresPage,
    VacinasPage,
    ModalVacinaPage,
    ModalSenhaPage,
    ModalEditUsuarioPage,
    ModalDesativarPage,
    VacinaPendentePage,
    CartaoVacinaPage,
    ModalRegVacUsuPage,
    ControleVacinasPage,
    ModalEditVacinacaoPage,
    CartaoVacinaFamiliarPage,
    ModalEditFamiliarPage,
    PetsPage,
    ModalRegFamiliarPage,
    NotificacoesPage,
    ModalRegPetPage,
    ModalEditPetPage,
    UsuarioPage,
    CartaoVacinaPetPage,
    ModalEditVacinacaoPetPage,
    ControleVacinaPetPage,
    ModalRegVacinacaoPetPage,
    VacinasPetPage,
    CuidadosViagensPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    { provide: Http, 
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, storage: Storage) => 
        new HttpProvider(backend, defaultOptions, storage), deps: [XHRBackend, RequestOptions, Storage] },
    UsuarioProvider,
    NotificationProvider,
    Network,
    CuidadoViagensProvider
  ]
})
export class AppModule {}
