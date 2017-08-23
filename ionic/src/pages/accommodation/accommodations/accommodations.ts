import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {EditAccommodationUserPage} from "../edit-accommodation-user/edit-accommodation-user";
import * as Globals from "../../../globals/globals";
import {LoginPage} from "../../auth/login/login";
/**
 * Generated class for the AccommodationsPage page.
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
    selector: 'page-accommodations',
    templateUrl: 'accommodations.html',
    providers: [myHTTPService],
})
export class AccommodationsPage {

    accommodations: Array<any>;
    user: Globals.user;
    accommodationsUser;
    ready: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private myService: myHTTPService) {
        this.accommodations = [];
        this.getCurrentUser();
    }

    private getCurrentUser() {
        this.user = new Globals.user;

        let userApi = JSON.parse(localStorage.getItem("currentUser"));
        this.user.id = userApi.id;
        this.user.firstname = userApi.firstname;
        this.user.lastname = userApi.lastname;
        this.user.email = userApi.email;
        this.user.phone = userApi.phone;
        this.user.phoneCountrycode = userApi.phoneCountrycode;
        this.user.nickname = userApi.nickname;
        this.user.country = userApi.country;
        this.user.city = userApi.city;
        this.user.street = userApi.street;
        this.user.streetNumber = userApi.streetNumber;
        this.user.postcode = userApi.postcode;
        this.user.discountTotal = userApi.discountTotal;
        this.user.discountDescription = userApi.discountDescription;

        let url = Globals.globals.url + "user/" + this.user.id;
        // let url = "http://localhost:8000/api/user/3";

        this.http.get(url)
            .subscribe(res => {
                this.user = res.json();
                this.getAccommodationsUser();
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

    private getAccommodationsUser() {
        let url = Globals.globals.url + "accommodationUser/" + this.user.id;
        // let url = "http://localhost:8000/api/accommodationUser/" + this.currentUser.id;
        this.http.get(url)
            .subscribe(res => {
                this.accommodationsUser = res.json();
                this.getAccommodations();
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

    private getAccommodations() {
        //TODO: handle this in one request
        //get all accommodations from the user, one by one
        for (let accommodationUser in this.accommodationsUser) {
            console.log(this.accommodationsUser, this.accommodationsUser[accommodationUser].accommodation_id);
            let url = Globals.globals.url + "accommodation/" + this.accommodationsUser[accommodationUser].accommodation_id;
            // let url = "http://localhost:8000/api/accommodation/" + this.accommodationsUser[accommodationUser].id;
            this.http.get(url)
                .subscribe(res => {
                    let result = res.json();
                    console.log('result',result);
                    let dateArrivalArray = this.accommodationsUser[accommodationUser].dateArrival.split('-').join(' ').split(':').join(' ').split(' ');
                    let dateDepartmentArray = this.accommodationsUser[accommodationUser].dateDepartment.split('-').join(' ').split(':').join(' ').split(' ');
                    const months = ["", "January", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    let dateArrivalObject = {
                        year:dateArrivalArray[0],
                        month:months[parseInt(dateArrivalArray[1])],
                        day:dateArrivalArray[2],
                        hours:dateArrivalArray[3],
                        minutes:dateArrivalArray[4],
                        seconds:dateArrivalArray[5]
                    };
                    let dateDepartmentObject = {
                        year:dateDepartmentArray[0],
                        month:months[parseInt(dateDepartmentArray[1])],
                        day:dateDepartmentArray[2],
                        hours:dateDepartmentArray[3],
                        minutes:dateDepartmentArray[4],
                        seconds:dateDepartmentArray[5]
                    };
                    //price, datearrival and datedepartment are from accommodationsuser
                    this.accommodations.push({
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        country: result.country,
                        city: result.city,
                        street: result.street,
                        streetNumber: result.streetNumber,
                        postcode: result.postcode,
                        phone: result.phone,
                        phoneCountrycode: result.phoneCountrycode,
                        pivot_id: this.accommodationsUser[accommodationUser].id,
                        roomNumber: this.accommodationsUser[accommodationUser].roomNumber,
                        description: this.accommodationsUser[accommodationUser].description,
                        price: this.accommodationsUser[accommodationUser].price,
                        dateArrival: this.accommodationsUser[accommodationUser].dateArrival,
                        dateDepartment: this.accommodationsUser[accommodationUser].dateDepartment,
                        dateArrivalObject: dateArrivalObject,
                        dateDepartmentObject: dateDepartmentObject
                    });
                    console.log(this.accommodations);
                    console.log(res.json());
                }, (err) => {
                    console.log('err', err);
                    console.log(err._body);
                });
        }
        this.ready = true;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccommodationsPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    toggleActive(id) {
        //carousel function
        if (this.ready) {
            //close all carousel items
            let isActive = document.getElementById("item" + id.toString()).classList.contains('active');
            for (let id in this.accommodations) {
                document.getElementById("item" + this.accommodations[id].id.toString()).classList.remove("active");
                document.getElementById("item" + this.accommodations[id].id.toString()).classList.add("hidden");
                document.getElementById("iconArrow" + this.accommodations[id].id.toString()).classList.remove("ion-md-arrow-dropdown");
                document.getElementById("iconArrow" + this.accommodations[id].id.toString()).classList.add("ion-md-arrow-dropright");
                document.getElementById("iconEdit" + this.accommodations[id].id.toString()).classList.remove("active");
                document.getElementById("iconEdit" + this.accommodations[id].id.toString()).classList.add("hidden");
            }
            if (!isActive) {
                //open active carousel item
                document.getElementById("item" + id.toString()).classList.remove("hidden");
                document.getElementById("item" + id.toString()).classList.add("active");
                document.getElementById("iconArrow" + id.toString()).classList.remove("ion-md-arrow-dropright");
                document.getElementById("iconArrow" + id.toString()).classList.add("ion-md-arrow-dropdown");
                document.getElementById("iconEdit" + id.toString()).classList.remove("hidden");
                document.getElementById("iconEdit" + id.toString()).classList.add("active");
            }
        }
    }

    editAccommodationUserPage(accommodationUser) {
        console.log(accommodationUser);
        this.navCtrl.push(EditAccommodationUserPage, {accommodationUser: accommodationUser, from: 'accommodations'});
    }
}
