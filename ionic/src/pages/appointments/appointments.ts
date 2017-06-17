import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {EditAppointmentPage} from "../edit-appointment/edit-appointment";
import * as Globals from "../../globals/globals"
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

    //TODO: user id is still static
    currentUser: any = {id: 1};

    configEndPoint: string = Globals.globals.url + "user/" + this.currentUser.id;
    // configEndPoint: string = 'http://localhost:8000/api/user/1';


    //get http up and running
    getConfig() {
        return this.http
            .get(this.configEndPoint)
            .map(res => res.json());
    }
}
@Component({
    selector: 'page-appointments',
    templateUrl: 'appointments.html',
    providers: [myHTTPService],

})
export class AppointmentsPage {
    appointments: Array<{ id: number, name: string, type: string, description: string, country?: string, city?: string, street?: string, streetNumber?: string, postcode?: string, timeStart: any, timeEnd?: any }>;
    currentUser;
    appointmentsUser;
    ready: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private myService: myHTTPService) {
        this.appointments = [];
        this.getCurrentUser();
    }

    private getCurrentUser() {

        //TODO: change getCurrentUser to fetch data from localstorage
        this.currentUser = {
            id: 3
        };

        let url = Globals.globals.url + "user/" + this.currentUser.id;
        // let url = "http://localhost:8000/api/user/3";

        this.http.get(url)
            .subscribe(res => {
                this.currentUser = res.json();
                this.getAppointmentsUser();
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

    private getAppointmentsUser() {
        let url = Globals.globals.url + "appointmentUser/" + this.currentUser.id;
        // let url = "http://localhost:8000/api/appointmentUser/" + this.currentUser.id;
        this.http.get(url)
            .subscribe(res => {
                this.appointmentsUser = res.json();

                console.log(this.appointmentsUser);
                this.getAppointments();
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

    private getAppointments() {
        //TODO: handle this in one request
        //get all accommodations from the user, one by one
        for (let appointmentUser in this.appointmentsUser) {
            let url = Globals.globals.url + "appointment/" + this.appointmentsUser[appointmentUser].appointment_id;
            // let url = "http://localhost:8000/api/appointment/" + this.appointmentsUser[appointmentUser].appointment_id;
            this.http.get(url)
                .subscribe(res => {
                    let result = res.json();
                    this.appointments.push({
                        id: result.id,
                        name: result.name,
                        type: result.type,
                        description: result.description,
                        country: result.country,
                        city: result.city,
                        street: result.street,
                        streetNumber: result.streetNumber,
                        postcode: result.postcode,
                        timeStart: result.timeStart,
                        timeEnd: result.timeEnd
                    });
                }, (err) => {
                    console.log('err', err);
                    console.log(err._body);
                });
        }
        this.ready = true;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AppointmentsPage');
    }

    toggleActive(id) {
        //carousel function
        if (this.ready) {
            //close all carousel items
            let isActive = document.getElementById("item" + id.toString()).classList.contains('active');
            for (let id in this.appointments) {
                document.getElementById("item" + this.appointments[id].id.toString()).classList.remove("active");
                document.getElementById("item" + this.appointments[id].id.toString()).classList.add("hidden");
                document.getElementById("iconArrow" + this.appointments[id].id.toString()).classList.remove("ion-md-arrow-dropdown");
                document.getElementById("iconArrow" + this.appointments[id].id.toString()).classList.add("ion-md-arrow-dropright");
                document.getElementById("iconEdit" + this.appointments[id].id.toString()).classList.remove("active");
                document.getElementById("iconEdit" + this.appointments[id].id.toString()).classList.add("hidden");

            }
            if (!isActive) {
                //open active carousel item
                document.getElementById("item" + id.toString()).classList.remove("hidden");
                document.getElementById("item" + id.toString()).classList.add("active");
                document.getElementById("iconArrow" + id.toString()).classList.remove("ion-md-arrow-dropright");
                document.getElementById("iconArrow" + id.toString()).classList.add("ion-md-arrow-dropdown");
                document.getElementById("iconEdit" + id.toString()).classList.remove("hidden");
                document.getElementById("iconEdit" + id.toString()).classList.add("active");
            }
        }
    }

    editAppointmentPage(appointment) {
        this.navCtrl.push(EditAppointmentPage, {appointment: appointment});
    }
}
