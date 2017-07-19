import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule} from "@angular/http";

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppointmentsPage} from "../pages/appointment/appointments/appointments";
import {UserDetailsPage} from "../pages/user/user-details/user-details";
import {AccommodationsPage} from "../pages/accommodation/accommodations/accommodations";
import {LogoutPage} from "../pages/auth/logout/logout";
import {LoginPage} from "../pages/auth/login/login";
import {EditUserPage} from "../pages/user/edit-user/edit-user";
import {EditAppointmentPage} from "../pages/appointment/edit-appointment/edit-appointment";
import {EditAccommodationUserPage} from "../pages/accommodation/edit-accommodation-user/edit-accommodation-user";
import {CreateUserPage} from "../pages/user/create-user/create-user";
import {EditUserPasswordPage} from "../pages/user/edit-user-password/edit-user-password";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        UserDetailsPage,
        AppointmentsPage,
        AccommodationsPage,
        LoginPage,
        LogoutPage,
        EditUserPage,
        EditUserPasswordPage,
        EditAppointmentPage,
        EditAccommodationUserPage,
        CreateUserPage,

    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
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
        LogoutPage,
        EditUserPage,
        EditUserPasswordPage,
        EditAppointmentPage,
        EditAccommodationUserPage,
        CreateUserPage,

    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
