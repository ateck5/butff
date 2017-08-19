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
    selector: 'page-create-user',
    templateUrl: 'create-user.html',
    providers: [myHTTPService],
})
export class CreateUserPage {
    private userForm: FormGroup;
    apiRequestData;
    userApi;
    newUser;
    messageString;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));

        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', Validators.required],
            passwordRepeat: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            phoneCountrycode: [''],
            nickname: [''],
            country: [''],
            city: [''],
            street: [''],
            streetNumber: [''],
            postcode: [''],
            discountTotal: [''],
            discountDescription: ['']
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateUserPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    logForm() {
        console.log(this.userForm.value.password, this.userForm.value.passwordRepeat, this.userForm.value.password !== this.userForm.value.passwordRepeat)

        if (this.userForm.value.password !== this.userForm.value.passwordRepeat) {
            console.log(this.userForm.value);
            this.userForm.controls['password'].setValue('');
            this.userForm.controls['passwordRepeat'].setValue('');
            this.messageString = "ERROR: Passwords did not match.";
            console.log(this.userForm.value);
            return;
        }
        this.apiRequestData = {
            newUser: {
                username: this.userForm.value.username,
                firstname: this.userForm.value.firstname,
                lastname: this.userForm.value.lastname,
                password: this.userForm.value.password,
                email: this.userForm.value.email,
                phone: this.userForm.value.phone,
                phoneCountrycode: this.userForm.value.phoneCountrycode,
                nickname: this.userForm.value.nickname,
                country: this.userForm.value.country,
                city: this.userForm.value.city,
                street: this.userForm.value.street,
                streetNumber: this.userForm.value.streetNumber,
                postcode: this.userForm.value.postcode,
                discountTotal: this.userForm.value.discountTotal,
                discountDescription: this.userForm.value.discountDescription,
            },
            activeUser: {
                id: this.userApi.id,
                sessionId: this.userApi.sessionId
            }
        };
            this.newUser = {

            };
            console.log(this.newUser);

        // let url = Globals.globals.url + "user";
        let url = "/api/user";
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // console.log(JSON.stringify(this.user));
        this.http.post(url, JSON.stringify(this.apiRequestData), {headers: headers})
            .subscribe(res => {
                console.log('res', res.json());
                this.messageString = "SUCCES: User " + this.apiRequestData.newUser.username + " was added to the database.";
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
                if (err.status === 400){
                    this.messageString = err._body.replace('"', "");
                }
            });
    }

}
