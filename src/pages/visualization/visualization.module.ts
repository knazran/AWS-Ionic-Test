import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizationPage } from './visualization';

@NgModule({
  declarations: [
    VisualizationPage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizationPage),
  ],
  exports: [
    VisualizationPage
  ]
})
export class VisualizationPageModule {}
