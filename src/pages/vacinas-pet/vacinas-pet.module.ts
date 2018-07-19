import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacinasPetPage } from './vacinas-pet';

@NgModule({
  declarations: [
    VacinasPetPage,
  ],
  imports: [
    IonicPageModule.forChild(VacinasPetPage),
  ],
})
export class VacinasPetPageModule {}
