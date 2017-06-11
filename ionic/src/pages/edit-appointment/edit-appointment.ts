import {Component, Injectable} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, Headers} from "@angular/http";

/**
 * Generated class for the EditAppointmentPage page.
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
  selector: 'page-edit-appointment',
  templateUrl: 'edit-appointment.html',
  providers: [myHTTPService],
})
export class EditAppointmentPage {
  private appointmentForm: FormGroup;
  appointment;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private formBuilder: FormBuilder, private http: Http, private myService: myHTTPService) {
    this.navParams.get("appointment");
    this.appointment = this.navParams.data.appointment;

    let dateStart = this.appointment.timeStart.replace(" ", "T") + "Z";
    let dateEnd = this.appointment.timeEnd.replace(" ", "T") + "Z";

    //TODO: validating, ex: length
    this.appointmentForm = this.formBuilder.group({
      name: [this.appointment.name, Validators.required],
      type: [this.appointment.type, Validators.required],
      description: [this.appointment.description, Validators.required],
      country: [this.appointment.country],
      city: [this.appointment.city],
      street: [this.appointment.street],
      streetNumber: [this.appointment.streetNumber],
      postcode: [this.appointment.postcode],
      timeStart: [dateStart, Validators.required],
      timeEnd: [dateEnd]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAppointmentPage');
  }

  logForm() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');


    this.appointment.name = this.appointmentForm.value.name;
    this.appointment.type = this.appointmentForm.value.type;
    this.appointment.description = this.appointmentForm.value.description;
    this.appointment.country = this.appointmentForm.value.country;
    this.appointment.city = this.appointmentForm.value.city;
    this.appointment.street = this.appointmentForm.value.street;
    this.appointment.streetNumber = this.appointmentForm.value.streetNumber;
    this.appointment.postcode = this.appointmentForm.value.postcode;
    this.appointment.timeStart = this.appointmentForm.value.timeStart.replace("T", " ").replace("Z", "");
    this.appointment.timeEnd = this.appointmentForm.value.timeEnd.replace("T", " ").replace("Z", "");

    //TODO: change url to live url
    let url = "http://localhost:8000/api/appointment/"+ this.appointment.id;

    this.http.put(url, JSON.stringify(this.appointment), {headers: headers})
        .subscribe(res => {
          console.log('res', res.json());
          //TODO: refresh page after pop
          this.navCtrl.pop();
        }, (err) => {
          console.log('err', err);
          console.log(err._body);
        });
  }

}
