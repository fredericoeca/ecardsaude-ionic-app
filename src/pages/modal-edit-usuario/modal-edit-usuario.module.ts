import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditUsuarioPage } from './modal-edit-usuario';

@NgModule({
  declarations: [
    ModalEditUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditUsuarioPage),
  ],
})
export class ModalEditUsuarioPageModule {}
