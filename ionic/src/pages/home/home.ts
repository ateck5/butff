import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //TODO: make nickname generic based on user session
  user = { username : "Admin"};
  constructor(public navCtrl: NavController) {

  }

}
