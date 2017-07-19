import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import * as Globals from "../../../globals/globals"
import {LoginPage} from "../../auth/login/login";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

/**
 * Generated class for the EditUserPasswordPage page.
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
    templateUrl: 'edit-user-password.html',
    providers: [myHTTPService],
})

export class EditUserPasswordPage {
    private userForm: FormGroup;
    currentUser;
    user;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.user = new Globals.user;

        let userApi = JSON.parse(localStorage.getItem("currentUser"));
        this.user.id = userApi.id;
        this.user.firstname = userApi.firstname;
        this.user.lastname = userApi.lastname;
        this.user.email = userApi.email;
        this.user.phone = userApi.phone;
        this.user.phoneCountry = userApi.phoneCountry;
        this.user.nickname = userApi.nickname;
        this.user.country = userApi.country;
        this.user.city = userApi.city;
        this.user.street = userApi.street;
        this.user.streetNumber = userApi.streetNumber;
        this.user.postcode = userApi.postcode;
        this.user.discount = userApi.discount;
        this.user.discountDescription = userApi.discountDescription;

        //TODO: validating, ex: length
        this.userForm = this.formBuilder.group({
            password: ['', Validators.required],
            passwordRepeat: ['', Validators.required],
        });

        console.log('userform', this.userForm);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditUserPasswordPage');
        console.log(localStorage.getItem("currentUser"));
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }


    logForm() {
        if (this.userForm.value.password !== this.userForm.value.passwordRepeat) {
            console.log(this.userForm.value);
            this.userForm.controls['password'].setValue('');
            this.userForm.controls['passwordRepeat'].setValue('');

            console.log(this.userForm.value);
            return;
        }

        let newPassword = this.userForm.value.password;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        console.log(this.user);

        let url = Globals.globals.url + "user/" + this.user.id + "/changepassword";
        // let url = "http://localhost:8000/api/user/1";
        console.log(newPassword);

        this.http.put(url, JSON.stringify(this.user), {headers:headers})
            .subscribe(res => {
                console.log('res', res.json());
                this.navCtrl.pop();
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }
}
