import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the AccommodationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-accommodations',
    templateUrl: 'accommodations.html',
})
export class AccommodationsPage {

    accommodations: Array<{ name: string, email: string, country: string, city: string, street: string, streetNumber?: string, postcode: string, phone: string, phoneCountry?: string, price?: string, dateArrival: any, dateDepartment: any }>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.accommodations = [
            {
                name: "Hotel Good View",
                email: "ex@am.ple",
                country: "The Netherlands",
                city: "Breda",
                street: "StreetStr",
                postcode: "1234AB",
                phone: "0612345678",
                dateArrival: "2017-08-08 12:00:00",
                dateDepartment: "2017-08-08 12:00:00"
            },
            {
                name: "Hotel Average View",
                email: "ex@am.ple",
                country: "The Netherlands",
                city: "Breda",
                street: "StreetStr",
                streetNumber: "6",
                postcode: "1234AB",
                phone: "0612345678",
                phoneCountry: "+31",
                price: "999,00",
                dateArrival: "2017-08-08 12:00:00",
                dateDepartment: "2017-08-08 12:00:00",
            },
            {
                name: "Hotel Bad View",
                email: "ex@am.ple",
                country: "The Netherlands",
                city: "Breda",
                street: "StreetStr",
                postcode: "1234AB",
                phone: "0612345678",
                dateArrival: "2017-08-08 12:00:00",
                dateDepartment: "2017-08-08 12:00:00"
            }

        ];
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccommodationsPage');
    }

    toggleActive(id) {
        let isActive = document.getElementById("item" + id.toString()).classList.contains('active');
        for (let i = 0; i < this.accommodations.length; i++) {
            document.getElementById("item" + i.toString()).classList.remove("active");
            document.getElementById("item" + i.toString()).classList.add("hidden");
            document.getElementById("iconArrow" + i.toString()).classList.remove("ion-md-arrow-dropdown");
            document.getElementById("iconArrow" + i.toString()).classList.add("ion-md-arrow-dropright");
            document.getElementById("iconEdit" + i.toString()).classList.remove("active");
            document.getElementById("iconEdit" + i.toString()).classList.add("hidden");

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
