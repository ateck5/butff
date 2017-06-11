import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAccommodationPage } from './edit-accommodation';

@NgModule({
  declarations: [
    EditAccommodationPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAccommodationPage),
  ],
  exports: [
    EditAccommodationPage
  ]
})
export class EditAccommodationPageModule {}
