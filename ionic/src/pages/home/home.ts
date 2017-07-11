import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../auth/login/login";
import * as Globals from "../../globals/globals"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //TODO: make nickname generic based on user session
  user: Globals.user;
  constructor(public navCtrl: NavController) {
      this.user = new Globals.user;

      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.user.id = currentUser.id;
      this.user.username = currentUser.username;
      this.user.firstname = currentUser.firstname;
      this.user.lastname = currentUser.lastname;
      this.user.email = currentUser.email;
      this.user.phone = currentUser.phone;
      this.user.phoneCountry = currentUser.phoneCountry;
      this.user.nickname = currentUser.nickname;
      this.user.country = currentUser.country;
      this.user.city = currentUser.city;
      this.user.street = currentUser.street;
      this.user.streetNumber = currentUser.streetNumber;
      this.user.postcode = currentUser.postcode;
      this.user.discount = currentUser.discount;
      this.user.discountDescription = currentUser.discountDescription;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    if (localStorage.getItem("currentUser") === null) {
      this.navCtrl.setRoot(LoginPage);
    }
    console.log(JSON.parse(localStorage.getItem("currentUser")));
  }

}
