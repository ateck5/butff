import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";
import * as Globals from "../../globals/globals"
import {LoginPage} from "../login/login";

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
        this.navParams.get("accommodationUser");
        this.accommodationUser = {
            id: this.navParams.data.accommodationUser.id,
            price: this.navParams.data.accommodationUser.price,
            dateArrival:this.navParams.data.accommodationUser.dateArrival,
            dateDepartment:this.navParams.data.accommodationUser.dateDepartment
        };

        //change database datetime format to form datetime format
        let dateArrival = this.accommodationUser.dateArrival.replace(" ", "T") + "Z";
        let dateDepartment = this.accommodationUser.dateDepartment.replace(" ", "T") + "Z";

        //TODO: validating, ex: length
        this.accommodationUserForm = this.formBuilder.group({
            price: [this.accommodationUser.price, Validators.required],
            dateArrival: [dateArrival, Validators.required],
            dateDepartment: [dateDepartment, Validators.required],
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


        this.accommodationUser.price = this.accommodationUserForm.value.price;
        //change form datetime format to database datetime format
        this.accommodationUser.dateArrival = this.accommodationUserForm.value.dateArrival.replace("T", " ").replace("Z", "");
        this.accommodationUser.dateDepartment = this.accommodationUserForm.value.dateDepartment.replace("T", " ").replace("Z", "");

        let url = Globals.globals.url + "accommodationUser/" + this.accommodationUser.id;
        // let url = "http://localhost:8000/api/accommodationUser/" + this.accommodationUser.id;

        this.http.put(url, JSON.stringify(this.accommodationUser), {headers: headers})
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
