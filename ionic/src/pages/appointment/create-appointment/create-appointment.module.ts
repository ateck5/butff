import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAppointmentPage } from './create-appointment';

@NgModule({
  declarations: [
    CreateAppointmentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAppointmentPage),
  ],
  exports: [
    CreateAppointmentPage
  ]
})
export class CreateAppointmentPageModule {}
