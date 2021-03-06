import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import {LoginPage} from "../../auth/login/login";
import * as Globals from "../../../globals/globals"
import {user} from "../../../globals/globals";

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
    selector: 'page-create-appointment-user',
    templateUrl: 'create-appointment-user.html',
    providers: [myHTTPService],
})
export class CreateAppointmentUserPage {
    private appointmentUserForm: FormGroup;
    appointmentsList;
    usersList;
    ready:boolean = false;
    apiRequestData;
    userApi;
    messageString;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));

        // get users AND appointments
        this.getUsers();
        console.log( this.usersList, this.appointmentsList);
        this.appointmentUserForm = this.formBuilder.group({
            user: ['', Validators.required],
            appointment: ['', Validators.required],
        });
        console.log('constructor');
    }

    getUsers() {
        let url = Globals.globals.url + "user";
        this.http.get(url)
            .subscribe(res => {
                this.usersList = res.json();

                console.log(this.usersList);
                this.getAppointments()
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

    getAppointments(){
        let url = Globals.globals.url + "appointment";
        this.http.get(url)
            .subscribe(res => {
                this.appointmentsList = res.json();
                console.log(this.appointmentsList);
                this.ready = true;
                // this.appointmentUserForm
                //     .setValue(user, { onlySelf: true });
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateUserPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
        console.log("iondidviewload");
    }

    logForm() {
        this.apiRequestData = {
            newAppointmentUser: {
                user: this.appointmentUserForm.value.user,
                appointment: this.appointmentUserForm.value.appointment,
            },
            activeUser: {
                id: this.userApi.id,
                sessionId: this.userApi.sessionId
            }
        };

        let url = "/api/appointmentUser";
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                this.messageString = "SUCCES: Appointment was stored for the requested User.";
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
                if (err.status === 400) {
                    this.messageString = err._body.replace('"', "");
                }
            });
    }

}
