import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VacinaPendentePage } from './vacina-pendente';

@NgModule({
  declarations: [
    VacinaPendentePage,
  ],
  imports: [
    IonicPageModule.forChild(VacinaPendentePage),
  ],
})
export class VacinaPendentePageModule {}
