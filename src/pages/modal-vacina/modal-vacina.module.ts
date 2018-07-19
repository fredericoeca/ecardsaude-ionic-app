import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalVacinaPage } from './modal-vacina';

@NgModule({
  declarations: [
    ModalVacinaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalVacinaPage),
  ],
})
export class ModalVacinaPageModule {}
