import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditFamiliarPage } from './modal-edit-familiar';

@NgModule({
  declarations: [
    ModalEditFamiliarPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditFamiliarPage),
  ],
})
export class ModalEditFamiliarPageModule {}
