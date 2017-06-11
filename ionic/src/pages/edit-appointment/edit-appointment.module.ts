import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAppointmentsPage } from './edit-appointment';

@NgModule({
  declarations: [
    EditAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAppointmentsPage),
  ],
  exports: [
    EditAppointmentsPage
  ]
})
export class EditAppointmentsPageModule {}
