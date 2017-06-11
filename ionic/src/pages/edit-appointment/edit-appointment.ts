import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditAppointmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-appointment',
  templateUrl: 'edit-appointment.html',
})
export class EditAppointmentPage {

  appointment;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navParams.get("appointment");
    this.appointment = this.navParams.data.appointment;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAppointmentPage');
    console.log(this.appointment);
  }

}
