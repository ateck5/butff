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
    appointments: Array<{ title: string, value: string }>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.appointments = [
            {title: 'appointment1', value: 'value1'},
            {title: 'appointment2', value: 'value2'},
            {title: 'appointment3', value: 'value3'}

        ];
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AppointmentsPage');
    }

    toggleActive(id) {
        let classes = document.getElementById("icon" + id.toString()).className.split(" ");
        console.log(classes);
        for (let key in classes) {
            if (classes[key] == "ion-md-arrow-dropdown") {
                document.getElementById("item" + id.toString()).classList.add("hidden");
                document.getElementById("icon" + id.toString()).classList.remove("ion-md-arrow-dropdown");
                document.getElementById("icon" + id.toString()).classList.add("ion-md-arrow-dropright");
                return ('');
            }
            for (let i = 0; i < this.appointments.length; i++) {
                document.getElementById("item" + i.toString()).classList.add("hidden");
                document.getElementById("icon" + i.toString()).classList.remove("ion-md-arrow-dropdown");
                document.getElementById("icon" + i.toString()).classList.add("ion-md-arrow-dropright");
            }
            document.getElementById("item" + id.toString()).classList.remove("hidden");
            document.getElementById("icon" + id.toString()).classList.remove("ion-md-arrow-dropright");
            document.getElementById("icon" + id.toString()).classList.add("ion-md-arrow-dropdown");
        }
        
    }
}
