import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {EditAccommodationUserPage} from "../edit-accommodation-user/edit-accommodation-user";
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
    selector: 'page-accommodations',
    templateUrl: 'accommodations.html',
    providers: [myHTTPService],
})
export class AccommodationsPage {

    accommodations: Array<{ id: number, name: string, email: string, country: string, city: string, street: string, streetNumber?: string, postcode: string, phone: string, phoneCountry?: string, price?: string, dateArrival: any, dateDepartment: any }>;
    currentUser;
    accommodationsUser;
    ready: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private myService: myHTTPService) {
        this.accommodations = [];
        this.getCurrentUser();
    }

    private getCurrentUser() {
        //TODO: change getCurrentUser to fetch data from localstorage
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        //TODO: change url to live url
        //TODO: user id is still static
        let url = "http://localhost:8000/api/user/3";

        this.http.get(url)
            .subscribe(res => {
                this.currentUser = res.json();
                this.getAccommodationsUser();
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });
    }

    private getAccommodationsUser() {
        //TODO: change url to live url
        let url = "http://localhost:8000/api/accommodationUser/" + this.currentUser.id;
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
        for (let accommodationUser in this.accommodationsUser) {
            //TODO: change url to live url
            let url = "http://localhost:8000/api/accommodation/" + this.accommodationsUser[accommodationUser].id;
            this.http.get(url)
                .subscribe(res => {
                    let result = res.json();
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
                        phoneCountry: result.phoneCountrycode,
                        price: this.accommodationsUser[accommodationUser].price,
                        dateArrival: this.accommodationsUser[accommodationUser].dateArrival,
                        dateDepartment: this.accommodationsUser[accommodationUser].dateDepartment
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
    }

    toggleActive(id) {
        if (this.ready) {
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
        this.navCtrl.push(EditAccommodationUserPage, {accommodationUser: accommodationUser});
    }
}
