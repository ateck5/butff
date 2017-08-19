import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import * as Globals from "../../../globals/globals"
import {LoginPage} from "../../auth/login/login";
import {AppointmentsListPage} from "../appointments-list/appointments-list";

/**
 * Generated class for the EditAppointmentUserPage page.
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
    selector: 'page-edit-appointment-user',
    templateUrl: 'edit-appointment-user.html',
    providers: [myHTTPService],

})
export class EditAppointmentUserPage {
    private appointmentUserForm: FormGroup;
    appointmentUser;
    apiRequestData;
    userApi;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));
        // this.navParams.get("appointmentUser");

        if (this.navParams.data.appointment.hasOwnProperty("pivot")){
            this.appointmentUser = {
                id: this.navParams.data.appointment.pivot.id,
            };
        }else if (this.navParams.data.user.hasOwnProperty("pivot")){
            this.appointmentUser = {
                id: this.navParams.data.user.pivot.id,
            };
        }


        //TODO: validating, ex: length
        this.appointmentUserForm = this.formBuilder.group({

        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditAppointmentUserPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    logForm() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.apiRequestData = {
            appointment: {

            },
            activeUser: {
                id: this.userApi.id,
                sessionId: this.userApi.sessionId
            }
        };

        let url = Globals.globals.url + "appointmentUser/" + this.appointmentUser.id;
        // let url = "http://localhost:8000/api/appointmentUser/" + this.appointmentUser.id;

        this.http.put(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                //TODO: refresh page after pop
                this.navCtrl.setRoot(AppointmentsListPage);
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

}
