import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppointmentsPage} from "../pages/appointments/appointments";
import {UserDetailsPage} from "../pages/user-details/user-details";
import {AccommodationsPage} from "../pages/accommodations/accommodations";
import {LogoutPage} from "../pages/logout/logout";
import {LoginPage} from "../pages/login/login";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        UserDetailsPage,
        AppointmentsPage,
        AccommodationsPage,
        LoginPage,
        LogoutPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        UserDetailsPage,
        AppointmentsPage,
        AccommodationsPage,
        LoginPage,
        LogoutPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
