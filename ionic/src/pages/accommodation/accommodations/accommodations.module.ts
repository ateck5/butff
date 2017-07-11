import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccommodationsPage } from './accommodations';

@NgModule({
  declarations: [
    AccommodationsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccommodationsPage),
  ],
  exports: [
    AccommodationsPage
  ]
})
export class AccommodationsPageModule {}
