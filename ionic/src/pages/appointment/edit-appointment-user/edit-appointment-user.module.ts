import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAppointmentUserPage } from './edit-appointment-user';

@NgModule({
    declarations: [
        EditAppointmentUserPage,
    ],
    imports: [
        IonicPageModule.forChild(EditAppointmentUserPage),
    ],
    exports: [
        EditAppointmentUserPage
    ]
})
export class EditAppointmentUserPageModule {}
