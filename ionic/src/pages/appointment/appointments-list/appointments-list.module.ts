import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentsListPage } from './appointments';

@NgModule({
    declarations: [
        AppointmentsListPage,
    ],
    imports: [
        IonicPageModule.forChild(AppointmentsListPage),
    ],
    exports: [
        AppointmentsListPage
    ]
})
export class AppointmentsListPageModule {}
