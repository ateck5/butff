import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../../auth/login/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import * as Globals from "../../../globals/globals";
import {AccommodationsListPage} from "../accommodations-list/accommodations-list";


/**
 * Generated class for the EditAccommodationPage page.
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
    selector: 'page-edit-accommodation',
    templateUrl: 'edit-accommodation.html',
    providers: [myHTTPService],

})
export class EditAccommodationPage {
    private accommodationForm: FormGroup;
    accommodation;
    apiRequestData;
    userApi;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));
        this.accommodation = navParams.get('accommodation');
        console.log(navParams);
        this.accommodationForm = this.formBuilder.group({
            name: [this.accommodation.name, Validators.required],
            email: [this.accommodation.email],
            country: [this.accommodation.country],
            city: [this.accommodation.city],
            street: [this.accommodation.street],
            streetNumber: [this.accommodation.streetNumber],
            postcode: [this.accommodation.postcode],
            phone: [this.accommodation.phone],
            phoneCountrycode: [this.accommodation.phoneCountrycode],
            maxRooms: [this.accommodation.maxRooms],
            description: [this.accommodation.description]
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditAccommodationPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
        console.log(this.navParams.data.accommodation);
    }

    logForm() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.apiRequestData = {
            accommodation: {
                name : this.accommodationForm.value.name,
                email : this.accommodationForm.value.email,
                country : this.accommodationForm.value.country,
                city : this.accommodationForm.value.city,
                street : this.accommodationForm.value.street,
                streetNumber : this.accommodationForm.value.streetNumber,
                postcode : this.accommodationForm.value.postcode,
                phone : this.accommodationForm.value.phone,
                phoneCountrycode : this.accommodationForm.value.phoneCountrycode,
                maxRooms : this.accommodationForm.value.maxRooms,
                description: this.accommodationForm.value.description
            },
            activeUser: {
                id: this.userApi.id,
                sessionId: this.userApi.sessionId
            }
        };

        let url = Globals.globals.url + "accommodation/" + this.accommodation.id;
        // let url = "http://localhost:8000/api/accommodation/" + this.accommodation.id;

        this.http.put(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                //TODO: refresh page after pop
                this.navCtrl.setRoot(AccommodationsListPage);
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }
}
