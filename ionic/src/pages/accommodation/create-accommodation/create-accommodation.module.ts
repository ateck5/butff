import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAccommodationPage } from './create-accommodation';

@NgModule({
  declarations: [
    CreateAccommodationPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAccommodationPage),
  ],
  exports: [
    CreateAccommodationPage
  ]
})
export class CreateAccommodationPageModule {}
