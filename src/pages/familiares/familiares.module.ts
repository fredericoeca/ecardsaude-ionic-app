import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamiliaresPage } from './familiares';

@NgModule({
  declarations: [
    FamiliaresPage,
  ],
  imports: [
    IonicPageModule.forChild(FamiliaresPage),
  ],
})
export class FamiliaresPageModule {}
