import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import * as Globals from "../../../globals/globals"
import {LoginPage} from "../../auth/login/login";
import {AccommodationsListPage} from "../accommodations-list/accommodations-list";

/**
 * Generated class for the EditAccommodationUserPage page.
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
    selector: 'page-edit-accommodation-user',
    templateUrl: 'edit-accommodation-user.html',
    providers: [myHTTPService],

})
export class EditAccommodationUserPage {
    private accommodationUserForm: FormGroup;
    accommodationUser;
    apiRequestData;
    userApi;
    usersList;
    accommodationsList;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));
        console.log(this.navParams.data);
        // this.navParams.get("accommodationUser");
        // console.log(this.navParams.data.accommodationUser);

        if (this.navParams.data.from === "accommodations"){
            this.accommodationUser = {
                id: this.navParams.data.accommodationUser.id,
                user : this.navParams.data.accommodationUser.user_id,
                accommodation : this.navParams.data.accommodationUser.accommodation_id,
                price: this.navParams.data.accommodationUser.price,
                dateArrival: this.navParams.data.accommodationUser.dateArrival,
                dateDepartment: this.navParams.data.accommodationUser.dateDepartment,
                roomNumber: this.navParams.data.accommodationUser.roomNumber,
                description: this.navParams.data.accommodationUser.description
            }
        }else if (this.navParams.data.from === "accommodations-list"){
            this.accommodationUser = {
                id: this.navParams.data.user.pivot.id,
                user : this.navParams.data.user.pivot.user_id,
                accommodation : this.navParams.data.user.pivot.accommodation_id,
                price: this.navParams.data.user.pivot.price,
                dateArrival: this.navParams.data.user.pivot.dateArrival,
                dateDepartment: this.navParams.data.user.pivot.dateDepartment,
                roomNumber: this.navParams.data.user.pivot.roomNumber,
                description: this.navParams.data.user.pivot.description
            };
        }
        console.log(this.accommodationUser);

        //change database datetime format to form datetime format
        let dateArrival = this.accommodationUser.dateArrival.replace(" ", "T") + "Z";
        let dateDepartment = this.accommodationUser.dateDepartment.replace(" ", "T") + "Z";

        //TODO: validating, ex: length
        this.accommodationUserForm = this.formBuilder.group({
            user:[this.accommodationUser.user],
            accommodation: [this.accommodationUser.accommodation],
            price: [this.accommodationUser.price],
            dateArrival: [dateArrival, Validators.required],
            dateDepartment: [dateDepartment],
            roomNumber: [this.accommodationUser.roomNumber],
            description: [this.accommodationUser.description],
        });

        this.getUsers();
    }

    getUsers() {
        let url = Globals.globals.url + "user";
        this.http.get(url)
            .subscribe(res => {
                this.usersList = res.json();

                console.log(this.usersList);
                this.getAccommodations()
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

    getAccommodations(){
        let url = Globals.globals.url + "accommodation";
        this.http.get(url)
            .subscribe(res => {
                this.accommodationsList = res.json();
                console.log(this.accommodationsList);
                // this.ready = true;
                // this.accommodationUserForm
                //     .setValue(user, { onlySelf: true });
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditAccommodationUserPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    logForm() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');


        // this.accommodationUser.price = this.accommodationUserForm.value.price;
        // //change form datetime format to database datetime format
        // this.accommodationUser.dateArrival = this.accommodationUserForm.value.dateArrival.replace("T", " ").replace("Z", "");
        // this.accommodationUser.dateDepartment = this.accommodationUserForm.value.dateDepartment.replace("T", " ").replace("Z", "");

        this.apiRequestData = {
            accommodation: {
                user: this.accommodationUserForm.value.user,
                accommodation: this.accommodationUserForm.value.accommodation,
                price: this.accommodationUserForm.value.price,
                dateArrival: this.accommodationUserForm.value.dateArrival.replace("T", " ").replace("Z", ""),
                dateDepartment: this.accommodationUserForm.value.dateDepartment.replace("T", " ").replace("Z", ""),
                roomNumber: this.accommodationUserForm.value.roomNumber,
                description: this.accommodationUserForm.value.description
            },
            activeUser: {
                id: this.userApi.id,
                sessionId: this.userApi.sessionId
            }
        };

        let url = Globals.globals.url + "accommodationUser/" + this.accommodationUser.id;
        // let url = "http://localhost:8000/api/accommodationUser/" + this.accommodationUser.id;

        this.http.put(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                this.navCtrl.setRoot(AccommodationsListPage);
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

}
