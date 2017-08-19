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
import {EditAppointmentUserPage} from "../pages/appointment/edit-appointment-user/edit-appointment-user";
import {AppointmentsListPage} from "../pages/appointment/appointments-list/appointments-list";
import {CreateUserPage} from "../pages/user/create-user/create-user";
import {CreateAppointmentPage} from "../pages/appointment/create-appointment/create-appointment";
import {CreateAccommodationPage} from "../pages/accommodation/create-accommodation/create-accommodation";
import {CreateAppointmentUserPage} from "../pages/appointment/create-appointment-user/create-appointment-user";
import {CreateAccommodationUserPage} from "../pages/accommodation/create-accommodation-user/create-accommodation-user";
import {EditUserPasswordPage} from "../pages/user/edit-user-password/edit-user-password";
import {AccommodationsListPage} from "../pages/accommodation/accommodations-list/accommodations-list";
import {EditAccommodationPage} from "../pages/accommodation/edit-accommodation/edit-accommodation";
import {UserListPage} from "../pages/user/user-list/user-list";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        UserDetailsPage,
        UserListPage,
        AppointmentsPage,
        AccommodationsPage,
        AccommodationsListPage,
        EditAccommodationPage,
        EditAccommodationUserPage,
        LoginPage,
        LogoutPage,
        EditUserPage,
        EditUserPasswordPage,
        AppointmentsListPage,
        EditAppointmentPage,
        EditAppointmentUserPage,
        CreateAppointmentPage,
        CreateAppointmentUserPage,
        CreateAccommodationUserPage,
        CreateAccommodationPage,
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
        UserListPage,
        AppointmentsPage,
        AccommodationsPage,
        AccommodationsListPage,
        EditAccommodationPage,
        EditAccommodationUserPage,
        LoginPage,
        LogoutPage,
        EditUserPage,
        EditUserPasswordPage,
        AppointmentsListPage,
        EditAppointmentPage,
        EditAppointmentUserPage,
        CreateAppointmentPage,
        CreateAppointmentUserPage,
        CreateAccommodationUserPage,
        CreateAccommodationPage,
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
