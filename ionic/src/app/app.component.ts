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

    pages: Array<{ title: string, component: any, icon?: string }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'User List', component: UserListPage},
            {title: 'Appointments List', component: AppointmentsListPage},
            {title: 'Accommodations List', component: AccommodationsListPage},
            {title: 'Create User', component: CreateUserPage},
            {title: 'Create Appointment', component: CreateAppointmentPage},
            {title: 'Link Appointment User', component: CreateAppointmentUserPage},
            {title: 'Create Accommodation', component: CreateAccommodationPage},
            {title: 'Link Accommodation User', component: CreateAccommodationUserPage},
            {title: 'User Details', component: UserDetailsPage},
            {title: 'Appointments', component: AppointmentsPage},
            {title: 'Accommodations', component: AccommodationsPage},
            {title: 'Logout', component: LogoutPage, icon: "log-out"}
        ];

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
