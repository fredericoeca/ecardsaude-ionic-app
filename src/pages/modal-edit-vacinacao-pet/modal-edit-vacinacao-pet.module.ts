import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditVacinacaoPetPage } from './modal-edit-vacinacao-pet';

@NgModule({
  declarations: [
    ModalEditVacinacaoPetPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditVacinacaoPetPage),
  ],
})
export class ModalEditVacinacaoPetPageModule {}
