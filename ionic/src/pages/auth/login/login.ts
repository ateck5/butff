import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../../home/home";
import * as Globals from "../../../globals/globals"
import {Http, Headers} from "@angular/http";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Injectable()
class myHTTPService {
    constructor(private http: Http) {
    }

    currentUser: any = {id: 1};

    configEndPoint: string = Globals.globals.url + "user/" + this.currentUser.id;

    // configEndPoint: string = Globals.globals.url + "user/";
    // configEndPoint: string = 'http://localhost:8000/api/user/1';


    //get http up and running
    getConfig() {
        return this.http
            .get(this.configEndPoint)
            .map(res => res.json());
    }
}
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [myHTTPService],
})
export class LoginPage {
    private loginForm: FormGroup;
    user: Globals.user;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');

        if (localStorage.getItem("currentUser") != null) {
            this.navCtrl.setRoot(HomePage);
        }
    }

    login() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let username = this.loginForm.value.username;
        let password = this.loginForm.value.password;

        let url = Globals.globals.url + "login/" + 1;

        // this.http.post(Globals.globals.url + "user", JSON.stringify(this.user), {headers: headers}).subscribe(res=>{console.log('res', res.json())}, (err)=>{console.log('err',err)});

        console.log(url);
        this.http.put(url, JSON.stringify({username: username, password: password}), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                console.log(res.json().phoneCountrycode);
                //TODO: refresh page after pop
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
                this.user.discount = res.json().discount;
                this.user.discountDescription = res.json().discountDescription;

                localStorage.setItem("currentUser", JSON.stringify(this.user));
                console.log(this.user);
                this.navCtrl.setRoot(HomePage);

            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });

    }

}
