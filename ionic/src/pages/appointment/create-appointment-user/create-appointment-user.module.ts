import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAppointmentUserPage } from './create-appointment-user';

@NgModule({
  declarations: [
    CreateAppointmentUserPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAppointmentUserPage),
  ],
  exports: [
    CreateAppointmentUserPage
  ]
})
export class CreateAppointmentUserPageModule {}
