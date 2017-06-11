import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";

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
    }

    logForm() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');


        this.accommodationUser.price = this.accommodationUserForm.value.price;
        this.accommodationUser.dateArrival = this.accommodationUserForm.value.dateArrival.replace("T", " ").replace("Z", "");
        this.accommodationUser.dateDepartment = this.accommodationUserForm.value.dateDepartment.replace("T", " ").replace("Z", "");

        //TODO: change url to live url
        let url = "http://localhost:8000/api/accommodationUser/" + this.accommodationUser.id;

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
