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
    selector: 'page-create-accommodation',
    templateUrl: 'create-accommodation.html',
    providers: [myHTTPService],
})
export class CreateAccommodationPage {
    private accommodationForm: FormGroup;
    apiRequestData;
    userApi;
    messageString;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));

        this.accommodationForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', Validators.required],
            street: ['', Validators.required],
            streetNumber: [''],
            postcode: ['', Validators.required],
            phone: ['', Validators.required],
            phoneCountrycode: [''],
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
            newAccommodation: {
                name: this.accommodationForm.value.name,
                email: this.accommodationForm.value.email,
                country: this.accommodationForm.value.country,
                city: this.accommodationForm.value.city,
                street: this.accommodationForm.value.street,
                streetNumber: this.accommodationForm.value.streetNumber,
                postcode: this.accommodationForm.value.postcode,
                phone: this.accommodationForm.value.phone,
                phoneCountrycode: this.accommodationForm.value.phoneCountrycode,
            },
            activeUser: {
                id: this.userApi.id,
                sessionId: this.userApi.sessionId
            }
        };

        let url = "/api/accommodation";
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                this.messageString = "SUCCES: Accommodation " + this.apiRequestData.newAccommodation.name + " was added to the database.";
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
                if (err.status === 400) {
                    this.messageString = err._body.replace('"', "");
                }
            });
    }

}
