import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {EditAppointmentUserPage} from "../edit-appointment-user/edit-appointment-user";
import * as Globals from "../../../globals/globals";
import {LoginPage} from "../../auth/login/login";
import {EditAppointmentPage} from "../edit-appointment/edit-appointment";
/**
 * Generated class for the AppointmentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Injectable()
class myHTTPService {
    constructor(private http: Http) {
    }

    //get endpoint
    currentUser: any = {id: 1};
    configEndPoint: string = Globals.globals.url + "user/" + this.currentUser.id;

    //get http up and running
    getConfig() {
        return this.http
            .get(this.configEndPoint)
            .map(res => res.json());
    }
}

@Component({
    selector: 'page-appointments-list',
    templateUrl: 'appointments-list.html',
    providers: [myHTTPService],
})
export class AppointmentsListPage {
    userApi;
    appointmentsList;
    user: Globals.user;
    ready: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private myService: myHTTPService) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));

        let url = Globals.globals.url + "appointment";
        this.http.get(url)
            .subscribe(res => {
                this.appointmentsList = res.json();
                this.ready = true;
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AppointmentsPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    toggleActive(id) {

        //carousel function
        if (this.ready) {
            //close all carousel items
            let isActive = document.getElementById("item" + id).classList.contains('active');
            for (let item in this.appointmentsList) {
                // console.log(this.appointmentsList, id);
                document.getElementById("item" + id).classList.remove("active");
                document.getElementById("item" + id).classList.add("hidden");
                document.getElementById("iconArrow" + id).classList.remove("ion-md-arrow-dropdown");
                document.getElementById("iconArrow" + id).classList.add("ion-md-arrow-dropright");
                document.getElementById("iconEdit" + id).classList.remove("active");
                document.getElementById("iconEdit" + id).classList.add("hidden");
            }
            if (!isActive) {
                //open active carousel item
                document.getElementById("item" + id).classList.remove("hidden");
                document.getElementById("item" + id).classList.add("active");
                document.getElementById("iconArrow" + id).classList.remove("ion-md-arrow-dropright");
                document.getElementById("iconArrow" + id).classList.add("ion-md-arrow-dropdown");
                document.getElementById("iconEdit" + id).classList.remove("hidden");
                document.getElementById("iconEdit" + id).classList.add("active");
            }
        }
    }

    editAppointmentPage(appointment) {
        console.log("editAppointment", appointment);
        this.navCtrl.push(EditAppointmentPage, {appointment: appointment});
    }

    editAppointmentUserPage(appointment, user) {
        console.log("editAppointmentUser", appointment, user);

        this.navCtrl.push(EditAppointmentUserPage, {appointment: appointment, user: user});
    }

}
