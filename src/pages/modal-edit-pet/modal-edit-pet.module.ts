import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditPetPage } from './modal-edit-pet';

@NgModule({
  declarations: [
    ModalEditPetPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditPetPage),
  ],
})
export class ModalEditPetPageModule {}
