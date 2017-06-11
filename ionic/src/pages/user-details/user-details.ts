import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Response} from "@angular/http";
import {EditUserPage} from "../edit-user/edit-user";

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
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

    //TODO: change url to live url
    //TODO: user id is still static
    configEndPoint: string = 'http://localhost:8000/api/user/1';

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
    //TODO: change url to live url
    private usersUrl = "http://localhost:8000/api/user";

    userApi: any;
    user: {
        firstname: string,
        lastname: string,
        email: string,
        phone: string,
        phoneCountry?: string,
        nickname?: string,
        country?: string,
        city?: string,
        street?: string,
        streetNumber?: string,
        postcode?: string,
        discount?: string,
        discountDescription?: string
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private myService: myHTTPService) {

        this.user = {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            phoneCountry: "",
            nickname: "",
            country: "",
            city: "",
            street: "",
            streetNumber: "",
            postcode: "",
            discount: "",
            discountDescription: ""
        };
        //TODO: make get request similar to edit-user and appointments using this.http.get
        this.myService.getConfig().subscribe(val => {
            console.log(val);
            this.userApi = val;
            this.setUser();

        });
        this.myService.getConfig();
    }

    getData() {
        return this.http.get(this.usersUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        console.log('succes');
        let body = res.json();
        return body.data || {};
        // return body;
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    setUser() {
        this.user = {
            firstname: this.userApi.firstname,
            lastname: this.userApi.lastname,
            email: this.userApi.email,
            phone: this.userApi.phone,
            phoneCountry: this.userApi.phoneCountrycode,
            nickname: this.userApi.nickname,
            country: this.userApi.country,
            city: this.userApi.city,
            street: this.userApi.street,
            streetNumber: this.userApi.streetNumber,
            postcode: this.userApi.postcode,
            discount: this.userApi.discount,
            discountDescription: this.userApi.discountDescription
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserDetailsPage');

    }

    editUsersPage(){
        this.navCtrl.push(EditUserPage, {user: this.userApi});
    }
}
