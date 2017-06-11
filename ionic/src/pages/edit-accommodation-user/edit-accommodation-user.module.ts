import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAccommodationUserPage } from './edit-accommodation-user';

@NgModule({
  declarations: [
    EditAccommodationUserPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAccommodationUserPage),
  ],
  exports: [
    EditAccommodationUserPage
  ]
})
export class EditAccommodationUserPageModule {}
