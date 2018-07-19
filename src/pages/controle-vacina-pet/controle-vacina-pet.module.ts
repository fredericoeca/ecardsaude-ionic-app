import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ControleVacinaPetPage } from './controle-vacina-pet';

@NgModule({
  declarations: [
    ControleVacinaPetPage,
  ],
  imports: [
    IonicPageModule.forChild(ControleVacinaPetPage),
  ],
})
export class ControleVacinaPetPageModule {}
