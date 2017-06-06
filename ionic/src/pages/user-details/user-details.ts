import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the UserDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-user-details',
    templateUrl: 'user-details.html',
})
export class UserDetailsPage {
    user: { firstname: string, lastname: string, email: string, phone: string, phoneCountry?: string, nickname?: string, country?: string, city?: string, street?: string, streetNumber?: string, postcode?: string, discount?: string, discountDescription?: string };

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.user = {firstname: "Herman", lastname: "Achternaamus", email: "ex@am.ple", phone: "0612345678"};
        // this.user = {
        //     firstname: "Herman",
        //     lastname: "Achternaamus",
        //     email: "ex@am.ple",
        //     phone: "0612345678",
        //     phoneCountry: "+31",
        //     nickname: "Testus",
        //     country: "The Netherlands",
        //     city: "Breda",
        //     street: "Straatstr",
        //     streetNumber: "6A",
        //     postcode: "1234AB",
        //     discount: "999,00",
        //     discountDescription: "€1,00 drink, €4,95 food€1,00 drink, €4,95 food€1,00 drink, €4,95 food€1,00 drink, €4,95 food€1,00 drink, €4,95 food€1,00 drink, €4,95 food€1,00 drink, €4,95 food€1,00 drink, €4,95 food€1,00 drink, €4,95 food"
        // };
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserDetailsPage');
    }

}
