import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import * as Globals from "../../globals/globals"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

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
    selector: 'page-edit-user',
    templateUrl: 'edit-user.html',
    providers: [myHTTPService],
})

export class EditUserPage {
    private userForm: FormGroup;
    currentUser;
    user;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.navParams.get("user");
        this.user = this.navParams.data.user;

        //TODO: validating, ex: length
        this.userForm = this.formBuilder.group({
            firstname: [this.user.firstname, Validators.required],
            lastname: [this.user.lastname, Validators.required],
            email: [this.user.email, Validators.required],
            phone: [this.user.phone, Validators.required],
            phoneCountrycode: [this.user.phoneCountrycode],
            nickname: [this.user.nickname],
            country: [this.user.country],
            city: [this.user.city],
            street: [this.user.street],
            streetNumber: [this.user.streetNumber],
            postcode: [this.user.postcode]
        });

        console.log('userform', this.userForm);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditUserPage');
    }


    logForm() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.user.firstname = this.userForm.value.firstname;
        this.user.lastname = this.userForm.value.lastname;
        this.user.email = this.userForm.value.email;
        this.user.phone = this.userForm.value.phone;
        this.user.phoneCountry = this.userForm.value.phoneCountry;
        this.user.nickname = this.userForm.value.nickname;
        this.user.country = this.userForm.value.country;
        this.user.city = this.userForm.value.city;
        this.user.street = this.userForm.value.street;
        this.user.streetNumber = this.userForm.value.streetNumber;
        this.user.postcode = this.userForm.value.postcode;

        //TODO: user id is still static
        this.currentUser = {id: 1};
        let url = Globals.globals.url + "user/" + this.currentUser.id;
        // let url = "http://localhost:8000/api/user/1";

        this.http.put(url, JSON.stringify(this.user), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                //TODO: refresh page after pop
                this.navCtrl.pop();
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }
}
