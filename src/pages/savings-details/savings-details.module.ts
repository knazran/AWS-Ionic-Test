import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavingsDetailsPage } from './savings-details';

@NgModule({
  declarations: [
    SavingsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavingsDetailsPage),
  ],
  exports: [
    SavingsDetailsPage
  ]
})
export class SavingsDetailsPageModule {}
