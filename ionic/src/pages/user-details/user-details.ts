import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Response} from "@angular/http";
import {EditUserPage} from "../edit-user/edit-user";
import {LoginPage} from "../login/login";
import * as Globals from "../../globals/globals"

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';


/**
 * Generated class for the UserDetailsPage page.
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
    selector: 'page-user-details',
    templateUrl: 'user-details.html',
    providers: [myHTTPService],
})
export class UserDetailsPage {
    user: Globals.user;


    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private myService: myHTTPService) {
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

        // this.myService.getConfig().subscribe(val => {
        //     console.log(val);
        //     this.userApi = val;
        //     this.setUser();
        //
        // });
        // this.myService.getConfig();
    }

    // getData() {
        // let url = Globals.globals.url + "user/" + this.user.id;


        // return this.http.get(this.usersUrl)
        //     .map(this.extractData)
        //     .catch(this.handleError);
    // }

    // private extractData(res: Response) {
    //     console.log('succes');
    //     let body = res.json();
    //     return body.data || {};
    //     // return body;
    // }

    // private handleError(error: Response | any) {
    //     // In a real world app, you might use a remote logging infrastructure
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //         const body = error.json() || '';
    //         const err = body.error || JSON.stringify(body);
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.error(errMsg);
    //     return Observable.throw(errMsg);
    // }

    // setUser() {
    //     this.user = {
    //         firstname: this.userApi.firstname,
    //         lastname: this.userApi.lastname,
    //         email: this.userApi.email,
    //         phone: this.userApi.phone,
    //         phoneCountry: this.userApi.phoneCountrycode,
    //         nickname: this.userApi.nickname,
    //         country: this.userApi.country,
    //         city: this.userApi.city,
    //         street: this.userApi.street,
    //         streetNumber: this.userApi.streetNumber,
    //         postcode: this.userApi.postcode,
    //         discount: this.userApi.discount,
    //         discountDescription: this.userApi.discountDescription
    //     }
    // }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserDetailsPage');
        console.log(localStorage.getItem("currentUser"));
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }

    }

    editUsersPage(){
        this.navCtrl.push(EditUserPage, {user: this.user});
    }
}
