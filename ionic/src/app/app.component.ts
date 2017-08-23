import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {UserDetailsPage} from "../pages/user/user-details/user-details";
import {AppointmentsPage} from "../pages/appointment/appointments/appointments";
import {AccommodationsPage} from "../pages/accommodation/accommodations/accommodations";
import {LogoutPage} from "../pages/auth/logout/logout";
import {LoginPage} from "../pages/auth/login/login";
import {CreateUserPage} from "../pages/user/create-user/create-user";
import {AccommodationsListPage} from "../pages/accommodation/accommodations-list/accommodations-list";
import {AppointmentsListPage} from "../pages/appointment/appointments-list/appointments-list";
import {UserListPage} from "../pages/user/user-list/user-list";
import {CreateAppointmentPage} from "../pages/appointment/create-appointment/create-appointment";
import {CreateAccommodationPage} from "../pages/accommodation/create-accommodation/create-accommodation";
import {CreateAppointmentUserPage} from "../pages/appointment/create-appointment-user/create-appointment-user";
import {CreateAccommodationUserPage} from "../pages/accommodation/create-accommodation-user/create-accommodation-user";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    // rootPage: any = HomePage;

    // pages: Array<{ title: string, component: any, icon?: string }>;
    pagesUser: Array<{ title: string, component: any, icon?: string }>;
    pagesAppointment: Array<{ title: string, component: any, icon?: string }>;
    pagesAccommodation: Array<{ title: string, component: any, icon?: string }>;
    pageLogin: {title: string, component: any, icon?:string};
    pageLogout: {title: string, component: any, icon?:string};

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pageLogin = {title: 'Home', component: HomePage};

        this.pagesUser = [
            {title: 'User List', component: UserListPage},
            {title: 'Create User', component: CreateUserPage},
            {title: 'User Details', component: UserDetailsPage},
        ];

        this.pagesAppointment = [
            {title: 'Appointments List', component: AppointmentsListPage},
            {title: 'Create Appointment', component: CreateAppointmentPage},
            {title: 'Link Appointment User', component: CreateAppointmentUserPage},
            {title: 'Appointments', component: AppointmentsPage},
        ];

        this.pagesAccommodation = [
            {title: 'Accommodations List', component: AccommodationsListPage},
            {title: 'Link Accommodation User', component: CreateAccommodationUserPage},
            {title: 'Create Accommodation', component: CreateAccommodationPage},
            {title: 'Accommodations', component: AccommodationsPage},
        ];

        this.pageLogout = {title: 'Logout', component: LogoutPage, icon: "log-out"};

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
