import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalRegPetPage } from './modal-reg-pet';

@NgModule({
  declarations: [
    ModalRegPetPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalRegPetPage),
  ],
})
export class ModalRegPetPageModule {}
