import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAccommodationUserPage } from './create-accommodation-user';

@NgModule({
  declarations: [
    CreateAccommodationUserPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAccommodationUserPage),
  ],
  exports: [
    CreateAccommodationUserPage
  ]
})
export class CreateAccommodationUserPageModule {}
