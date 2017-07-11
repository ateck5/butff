import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http} from "@angular/http";
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
    user: Globals.user;
    newUser;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
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

        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', Validators.required],
            passwordRepeat: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            phoneCountry: [''],
            nickname: [''],
            country: [''],
            city: [''],
            street: [''],
            streetNumber: [''],
            postcode: [''],
            discount: [''],
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
            // this.userForm.reset({
            //     password: {value:''},
            //     passwordRepeat: {value:''}});
            console.log(this.userForm.value);
            return;
        }
            // this.userForm = this.formBuilder.group({
            //     username: [this.userForm.value.username, Validators.required],
            //     firstname: [this.userForm.value.lastname, Validators.required],
            //     lastname: ['', Validators.required],
            //     password: [this.userForm.value.email, Validators.required],
            //     passwordRepeat: [this.userForm.value.phone, Validators.required],
            //     email: [this.userForm.value.email, Validators.required],
            //     phone: [this.userForm.value.phone, Validators.required],
            //     phoneCountry: [this.userForm.value.phoneCountry],
            //     nickname: [this.userForm.value.nickname],
            //     country: [this.userForm.value.country],
            //     city: [this.userForm.value.city],
            //     street: [this.userForm.value.street],
            //     streetNumber: [this.userForm.value.streetNumber],
            //     postcode: [this.userForm.value.postcode],
            //     discount: [this.userForm.value.discount],
            //     discountDescription: [this.userForm.value.discountDescription]
            // });
            // return;
        // } else {
            this.newUser = {
                username: this.userForm.value.username,
                firstname: this.userForm.value.firstname,
                lastname: this.userForm.value.lastname,
                password: this.userForm.value.password,
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
                discountDescription: this.userForm.value.discountDescription,
            }
            console.log(this.newUser);
        // }
    }

}
