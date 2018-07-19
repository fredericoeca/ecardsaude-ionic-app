import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ControleVacinasPage } from './controle-vacinas';

@NgModule({
  declarations: [
    ControleVacinasPage,
  ],
  imports: [
    IonicPageModule.forChild(ControleVacinasPage),
  ],
})
export class ControleVacinasPageModule {}
