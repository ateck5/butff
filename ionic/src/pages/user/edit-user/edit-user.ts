import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import * as Globals from "../../../globals/globals"
import {LoginPage} from "../../auth/login/login";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {UserDetailsPage} from "../user-details/user-details";

/**
 * Generated class for the EditUserPage page.
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
    selector: 'page-edit-user',
    templateUrl: 'edit-user.html',
    providers: [myHTTPService],
})

export class EditUserPage {
    private userForm: FormGroup;
    currentUser;
    user;
    apiRequestData;
    userApi;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));
        this.navParams.get("user");
        this.user = this.navParams.data.user;
        console.log(this.navParams.data.user);

        console.log(this.user.discount);

        //TODO: validating, ex: length
        this.userForm = this.formBuilder.group({
            firstname: [this.user.firstname, Validators.required],
            lastname: [this.user.lastname, Validators.required],
            email: [this.user.email, Validators.required],
            phone: [this.user.phone, Validators.required],
            phoneCountry: [this.user.phoneCountry],
            nickname: [this.user.nickname],
            country: [this.user.country],
            city: [this.user.city],
            street: [this.user.street],
            streetNumber: [this.user.streetNumber],
            postcode: [this.user.postcode],
            discount: [this.user.discount],
            discountDescription: [this.user.discountDescription]
        });

        console.log('userform', this.userForm);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditUserPage');
        console.log(localStorage.getItem("currentUser"));
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    logForm() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.apiRequestData = {
            user: {
                firstname: this.userForm.value.firstname,
                lastname: this.userForm.value.lastname,
                email: this.userForm.value.email,
                phone: this.userForm.value.phone,
                phoneCountry: this.userForm.value.phoneCountry,
                nickname: this.userForm.value.nickname,
                country: this.userForm.value.country,
                city: this.userForm.value.city,
                street: this.userForm.value.street,
                streetNumber: this.userForm.value.streetNumber,
                postcode: this.userForm.value.postcode,
                discount: this.userForm.value.discount,
                discountDescription: this.userForm.value.discountDescription
            },
            activeUser: {
                id: this.userApi.id,
                sessionId: this.userApi.sessionId
            }
        };

        // this.currentUser = {id: 1};
        let url = Globals.globals.url + "user/" + this.user.id;
        // let url = "http://localhost:8000/api/user/1";
        console.log(this.user);
        console.log("url", url);

        this.http.put(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                if( res.json().id === this.user.id){
                    this.user = new Globals.user;
                    this.user.id = res.json().id;
                    this.user.username = res.json().username;
                    this.user.firstname = res.json().firstname;
                    this.user.lastname = res.json().lastname;
                    this.user.email = res.json().email;
                    this.user.phone = res.json().phone;
                    this.user.phoneCountry = res.json().phoneCountrycode;
                    this.user.nickname = res.json().nickname;
                    this.user.country = res.json().country;
                    this.user.city = res.json().city;
                    this.user.street = res.json().street;
                    this.user.streetNumber = res.json().streetNumber;
                    this.user.postcode = res.json().postcode;
                    this.user.sessionId = res.json().sessionId;
                    this.user.discount = res.json().discountTotal;
                    this.user.discountDescription = res.json().discountDescription;

                    localStorage.setItem("currentUser", JSON.stringify(this.user));
                }
                this.navCtrl.setRoot(UserDetailsPage);
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }
}
