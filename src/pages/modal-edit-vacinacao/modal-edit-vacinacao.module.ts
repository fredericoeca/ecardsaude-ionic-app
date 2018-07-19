import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditVacinacaoPage } from './modal-edit-vacinacao';

@NgModule({
  declarations: [
    ModalEditVacinacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditVacinacaoPage),
  ],
})
export class ModalEditVacinacaoPageModule {}
