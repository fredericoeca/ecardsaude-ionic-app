import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSenhaPage } from './modal-senha';

@NgModule({
  declarations: [
    ModalSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalSenhaPage),
  ],
})
export class ModalSenhaPageModule {}
