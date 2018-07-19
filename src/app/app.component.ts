import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FamiliaresPage } from '../pages/familiares/familiares';
import { VacinasPage } from '../pages/vacinas/vacinas';
import { PetsPage } from '../pages/pets/pets';
import { Storage } from '@ionic/storage';
import { UsuarioPage } from '../pages/usuario/usuario';
import { CuidadosViagensPage } from '../pages/cuidados-viagens/cuidados-viagens';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  
  pages: Array<{ icon: string, title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthProvider,
    public storage: Storage,
    public events: Events
  ) {
    this.initializeApp();

    //console.log(this.authService.userIsLogged());
    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'ai-home', title: 'Home', component: HomePage },
      { icon: 'person', title: 'Perfil', component: UsuarioPage },
      { icon: 'ai-man-woman', title: 'Familiares', component: FamiliaresPage },
      { icon: 'ai-eyedropper', title: 'Vacinas', component: VacinasPage },
      { icon: 'paw', title: 'Pets', component: PetsPage },
      { icon: 'plane', title: 'Cuidados em Viagens', component: CuidadosViagensPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.storage.get('token').then( token => {
        if(!token){
          this.rootPage = LoginPage;
        } else {
          this.rootPage = HomePage;
        }
        
      })
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

    logout(){
      this.storage.clear();
      this.nav.setRoot(LoginPage);
  }

}
