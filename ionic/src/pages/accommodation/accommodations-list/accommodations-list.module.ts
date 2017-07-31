import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccommodationsListPage } from './accommodations';

@NgModule({
    declarations: [
        AccommodationsListPage,
    ],
    imports: [
        IonicPageModule.forChild(AccommodationsListPage),
    ],
    exports: [
        AccommodationsListPage
    ]
})
export class AccommodationsListPageModule {}
