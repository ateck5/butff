import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {EditAccommodationUserPage} from "../edit-accommodation-user/edit-accommodation-user";
import * as Globals from "../../../globals/globals";
import {LoginPage} from "../../auth/login/login";
import {EditAccommodationPage} from "../edit-accommodation/edit-accommodation";
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
    selector: 'page-accommodations-list',
    templateUrl: 'accommodations-list.html',
    providers: [myHTTPService],
})
export class AccommodationsListPage {
    userApi;
    accommodationsList;
    user: Globals.user;
    ready: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private myService: myHTTPService) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));

        let url = Globals.globals.url + "accommodation";
        this.http.get(url)
            .subscribe(res => {
                this.accommodationsList = res.json();
                this.ready = true;
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });

    }

    // private getAccommodationsList() {
    //     let url = Globals.globals.url + "accommodationUser/" + this.user.id;
    //     // let url = "http://localhost:8000/api/accommodationUser/" + this.currentUser.id;
    //     this.http.get(url)
    //         .subscribe(res => {
    //             this.accommodationsList = res.json();
    //             this.getAccommodations();
    //         }, (err) => {
    //             console.log('err', err);
    //             console.log(err._body);
    //         });
    // }
    //
    // private getAccommodations() {
    //     //TODO: handle this in one request
    //     //get all accommodations from the user, one by one
    //     for (let accommodationUser in this.accommodationsUser) {
    //         let url = Globals.globals.url + "accommodation/" + this.accommodationsUser[accommodationUser].id;
    //         // let url = "http://localhost:8000/api/accommodation/" + this.accommodationsUser[accommodationUser].id;
    //         this.http.get(url)
    //             .subscribe(res => {
    //                 let result = res.json();
    //                 //price, datearrival and datedepartment are from accommodationsuser
    //                 this.accommodations.push({
    //                     id: result.id,
    //                     name: result.name,
    //                     email: result.email,
    //                     country: result.country,
    //                     city: result.city,
    //                     street: result.street,
    //                     streetNumber: result.streetNumber,
    //                     postcode: result.postcode,
    //                     phone: result.phone,
    //                     phoneCountry: result.phoneCountrycode,
    //                     price: this.accommodationsUser[accommodationUser].price,
    //                     dateArrival: this.accommodationsUser[accommodationUser].dateArrival,
    //                     dateDepartment: this.accommodationsUser[accommodationUser].dateDepartment
    //                 });
    //                 console.log(this.accommodations);
    //                 console.log(res.json());
    //             }, (err) => {
    //                 console.log('err', err);
    //                 console.log(err._body);
    //             });
    //     }
    //     this.ready = true;
    // }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccommodationsPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    // toggleActive(id) {
    //     //carousel function
    //     if (this.ready) {
    //         //close all carousel items
    //         let isActive = document.getElementById("item" + id.toString()).classList.contains('active');
    //         for (let item in this.accommodationsList) {
    //             // console.log(this.accommodationsList, id);
    //             document.getElementById("item" + this.accommodationsList[item].id.toString()).classList.remove("active");
    //             document.getElementById("item" + this.accommodationsList[item].id.toString()).classList.add("hidden");
    //             document.getElementById("iconArrow" + this.accommodationsList[item].id.toString()).classList.remove("ion-md-arrow-dropdown");
    //             document.getElementById("iconArrow" + this.accommodationsList[item].id.toString()).classList.add("ion-md-arrow-dropright");
    //             document.getElementById("iconEdit" + this.accommodationsList[item].id.toString()).classList.remove("active");
    //             document.getElementById("iconEdit" + this.accommodationsList[item].id.toString()).classList.add("hidden");
    //         }
    //         if (!isActive) {
    //             //open active carousel item
    //             document.getElementById("item" + id.toString()).classList.remove("hidden");
    //             document.getElementById("item" + id.toString()).classList.add("active");
    //             document.getElementById("iconArrow" + id.toString()).classList.remove("ion-md-arrow-dropright");
    //             document.getElementById("iconArrow" + id.toString()).classList.add("ion-md-arrow-dropdown");
    //             document.getElementById("iconEdit" + id.toString()).classList.remove("hidden");
    //             document.getElementById("iconEdit" + id.toString()).classList.add("active");
    //         }
    //     }
    // }
    toggleActive(id) {

        //carousel function
        if (this.ready) {
            //close all carousel items
            let isActive = document.getElementById("item" + id).classList.contains('active');
            for (let item in this.accommodationsList) {
                // console.log(this.accommodationsList, id);
                document.getElementById("item" + id).classList.remove("active");
                document.getElementById("item" + id).classList.add("hidden");
                document.getElementById("iconArrow" + id).classList.remove("ion-md-arrow-dropdown");
                document.getElementById("iconArrow" + id).classList.add("ion-md-arrow-dropright");
                document.getElementById("iconEdit" + id).classList.remove("active");
                document.getElementById("iconEdit" + id).classList.add("hidden");
            }
            if (!isActive) {
                //open active carousel item
                document.getElementById("item" + id).classList.remove("hidden");
                document.getElementById("item" + id).classList.add("active");
                document.getElementById("iconArrow" + id).classList.remove("ion-md-arrow-dropright");
                document.getElementById("iconArrow" + id).classList.add("ion-md-arrow-dropdown");
                document.getElementById("iconEdit" + id).classList.remove("hidden");
                document.getElementById("iconEdit" + id).classList.add("active");
            }
        }
    }

    editAccommodationPage(accommodation) {
        console.log("editAccommodation", accommodation);
        this.navCtrl.push(EditAccommodationPage, {accommodation: accommodation});
    }

    editAccommodationUserPage(accommodation, user) {
        console.log("editAccommodationUser", accommodation, user);

        this.navCtrl.push(EditAccommodationUserPage, {accommodation: accommodation, user: user});
    }

//     editAccommodationAppointmentPage(accommodation){
//     console.log("editAccommodationAppointmentsPage", accommodation);
//     }
}
