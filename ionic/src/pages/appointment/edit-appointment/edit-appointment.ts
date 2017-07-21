import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import * as Globals from "../../../globals/globals"
import {LoginPage} from "../../auth/login/login";
import {AppointmentsPage} from "../appointments/appointments";

/**
 * Generated class for the EditAppointmentPage page.
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

    // configEndPoint: string = 'http://localhost:8000/api/user/1';


    //get http up and running
    getConfig() {
        return this.http
            .get(this.configEndPoint)
            .map(res => res.json());
    }
}
@Component({
    selector: 'page-edit-appointment',
    templateUrl: 'edit-appointment.html',
    providers: [myHTTPService],
})
export class EditAppointmentPage {
    private appointmentForm: FormGroup;
    userApi;
    apiRequestData;
    appointment;
    maxDate;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));

        this.navParams.get("appointment");
        this.appointment = this.navParams.data.appointment;

        this.maxDate = new Date().toISOString();
        this.maxDate = "2100" +  this.maxDate.slice(4, this.maxDate.length - 5).replace("T", " ");
        // this.maxDate = this.maxDate.replace("T", " ");
        // this.maxDate = "2100" + this.maxDate.split("").reverse().slice(0, this.maxDate.length - 2).reverse().join("");



        //change database datetime format to form datetime format
        let dateStart = this.appointment.timeStart.replace(" ", "T") + "Z";
        let dateEnd = this.appointment.timeEnd.replace(" ", "T") + "Z";

        //TODO: validating, ex: length
        this.appointmentForm = this.formBuilder.group({
            name: [this.appointment.name, Validators.required],
            type: [this.appointment.type, Validators.required],
            description: [this.appointment.description, Validators.required],
            country: [this.appointment.country],
            city: [this.appointment.city],
            street: [this.appointment.street],
            streetNumber: [this.appointment.streetNumber],
            postcode: [this.appointment.postcode],
            timeStart: [dateStart, Validators.required],
            timeEnd: [dateEnd]
        });

        console.log(this.maxDate);
        console.log(this.appointmentForm.value.timeStart);

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditAppointmentPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    logForm() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.apiRequestData = {
            appointment: {
                name: this.appointmentForm.value.name,
                type: this.appointmentForm.value.type,
                description: this.appointmentForm.value.description,
                country: this.appointmentForm.value.country,
                city: this.appointmentForm.value.city,
                street: this.appointmentForm.value.street,
                streetNumber: this.appointmentForm.value.streetNumber,
                postcode: this.appointmentForm.value.postcode,
                timeStart: this.appointmentForm.value.timeStart.replace("T", " ").replace("Z", ""),
                timeEnd: this.appointmentForm.value.timeEnd.replace("T", " ").replace("Z", ""),

            },
            activeUser: {
                id: this.userApi.id,
                sessionId: this.userApi.sessionId
            }
        };

        let url = Globals.globals.url + "appointment/" + this.appointment.id;
        // let url = "http://localhost:8000/api/appointment/" + this.appointment.id;
        console.log(url);
        this.http.put(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                //TODO: refresh page after pop
                this.navCtrl.setRoot(AppointmentsPage);
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

}
