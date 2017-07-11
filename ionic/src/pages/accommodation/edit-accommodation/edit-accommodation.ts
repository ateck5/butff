import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../../../login/login";

/**
 * Generated class for the EditAccommodationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-accommodation',
  templateUrl: 'edit-accommodation.html',
})
export class EditAccommodationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccommodationPage');
    if (localStorage.getItem("currentUser") === null) {
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
