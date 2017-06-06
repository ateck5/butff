import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the AppointmentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-appointments',
    templateUrl: 'appointments.html',
})
export class AppointmentsPage {
    appointments: Array<{ title: string, type: string, description: string, country?: string, city?: string, street?: string, streetNumber?: string, postcode?: string, timeStart: any, timeEnd?: any }>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.appointments = [
            {title: 'appointment1', type: 'value1', description: "lorem ipsum dolor sit amed e ugesti a lunga dolci prego e liandi di el cintro de namico mon bellicimo.", timeStart: "2017-08-08 12:00:00"},
            {title: 'appointment2', type: 'value2', description: "lorem ipsum dolor sit amed e ugesti a lunga dolci prego e liandi di el cintro de namico mon bellicimo.", country: "Nederland", timeStart: "2017-08-08 12:00:00"},
            {title: 'appointment3', type: 'value3', description: "lorem ipsum dolor sit amed e ugesti a lunga dolci prego e liandi di el cintro de namico mon bellicimo.", timeStart: "2017-08-08 12:00:00"}

        ];
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AppointmentsPage');
    }

    toggleActive(id) {
        let isActive = document.getElementById("item" + id.toString()).classList.contains('active');
        for (let i = 0; i < this.appointments.length; i++) {
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
