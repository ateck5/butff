import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import {LoginPage} from "../../auth/login/login";
import * as Globals from "../../../globals/globals"

/**
 * Generated class for the CreateUserPage page.
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
    selector: 'page-create-appointment',
    templateUrl: 'create-appointment.html',
    providers: [myHTTPService],
})
export class CreateAppointmentPage {
    private appointmentForm: FormGroup;
    apiRequestData;
    userApi;
    messageString;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));

        this.appointmentForm = this.formBuilder.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            description: [''],
            country: [''],
            city: [''],
            street: [''],
            streetNumber: [''],
            postcode: [''],
            timeStart: [''],
            timeEnd: [''],
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateUserPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    logForm() {
        this.apiRequestData = {
            newAppointment: {
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

        let url = "/api/appointment";
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                this.messageString = "SUCCES: Appointment " + this.apiRequestData.newAppointment.name + " was added to the database.";
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
                if (err.status === 400) {
                    this.messageString = err._body.replace('"', "");
                }
            });
    }

}
