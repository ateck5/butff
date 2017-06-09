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
    //TODO: change localhost to actual domain
    private usersUrl = "http://localhost:8000/api/user";

    userApi: any;
    user: { firstname: string, lastname: string, email: string, phone: string, phoneCountry?: string, nickname?: string, country?: string, city?: string, street?: string, streetNumber?: string, postcode?: string, discount?: string, discountDescription?: string };

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
        this.myService.getConfig().subscribe(val => {
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
            firstname: this.userApi[0].firstname,
            lastname: this.userApi[0].lastname,
            email: this.userApi[0].email,
            phone: this.userApi[0].phone,
            phoneCountry: this.userApi[0].phoneCountry,
            nickname: this.userApi[0].nickname,
            country: this.userApi[0].country,
            city: this.userApi[0].city,
            street: this.userApi[0].street,
            streetNumber: this.userApi[0].streetNumber,
            postcode: this.userApi[0].postcode,
            discount: this.userApi[0].discount,
            discountDescription: this.userApi[0].discountDescription
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserDetailsPage');

    }

    editUsersPage(){
        this.navCtrl.push(EditUserPage, this.userApi);
    }
}
