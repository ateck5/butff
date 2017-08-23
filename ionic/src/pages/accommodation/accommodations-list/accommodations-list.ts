import {Component, Injectable} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {EditAccommodationUserPage} from "../edit-accommodation-user/edit-accommodation-user";
import * as Globals from "../../../globals/globals";
import {LoginPage} from "../../auth/login/login";
import {EditAccommodationPage} from "../edit-accommodation/edit-accommodation";
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

    //get endpoint
    currentUser: any = {id: 1};
    configEndPoint: string = Globals.globals.url + "user/" + this.currentUser.id;
    // configEndPoint: string = 'http://localhost:8000/api/user/1';

    //get http up and running
    getConfig() {
        return this.http
            .get(this.configEndPoint)
            .map(res => res.json());
    }
}

@Component({
    selector: 'page-accommodations-list',
    templateUrl: 'accommodations-list.html',
    providers: [myHTTPService],
})
export class AccommodationsListPage {
    userApi;
    accommodationsList;
    user: Globals.user;
    ready: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private myService: myHTTPService) {
        this.userApi = JSON.parse(localStorage.getItem("currentUser"));

        let url = Globals.globals.url + "accommodation";
        this.http.get(url)
            .subscribe(res => {
                this.accommodationsList = res.json();
                console.log(this.accommodationsList);
                for (let accommodation in this.accommodationsList) {
                    if (this.accommodationsList[accommodation].users.length > 0) {
                        for (let user in this.accommodationsList[accommodation].users) {
                            let dateArrivalArray = this.accommodationsList[accommodation].users[user].pivot.dateArrival.split('-').join(' ').split(':').join(' ').split(' ');
                            let dateDepartmentArray = this.accommodationsList[accommodation].users[user].pivot.dateDepartment.split('-').join(' ').split(':').join(' ').split(' ');
                            const months = ["", "January", "Februari", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                            let dateArrivalObject = {
                                year:dateArrivalArray[0],
                                month:months[parseInt(dateArrivalArray[1])],
                                day:dateArrivalArray[2],
                                hours:dateArrivalArray[3],
                                minutes:dateArrivalArray[4],
                                seconds:dateArrivalArray[5]
                            };
                            let dateDepartmentObject = {
                                year:dateDepartmentArray[0],
                                month:months[parseInt(dateDepartmentArray[1])],
                                day:dateDepartmentArray[2],
                                hours:dateDepartmentArray[3],
                                minutes:dateDepartmentArray[4],
                                seconds:dateDepartmentArray[5]
                            };
                            this.accommodationsList[accommodation].users[user].dateArrivalObject = dateArrivalObject;
                            this.accommodationsList[accommodation].users[user].dateDepartmentObject = dateDepartmentObject;
                            console.log( this.accommodationsList[accommodation].users[user].dateArrivalObject,  this.accommodationsList[accommodation].users[user].dateDepartmentObject);
                            console.log('user', this.accommodationsList[accommodation].users[user]);
                        }
                        console.log(this.accommodationsList[accommodation].name, this.accommodationsList[accommodation].users);
                    }
                }
                this.ready = true;
            }, (err) => {
                console.log('err', err);
                console.log(err._body);
            });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccommodationsPage');
        if (localStorage.getItem("currentUser") === null) {
            this.navCtrl.setRoot(LoginPage);
        }
    }

    toggleActive(id) {

        //carousel function
        if (this.ready) {
            //close all carousel items
            let isActive = document.getElementById("item" + id).classList.contains('active');
            for (let item in this.accommodationsList) {
                // console.log(this.accommodationsList, id);
                document.getElementById("item" + id).classList.remove("active");
                document.getElementById("item" + id).classList.add("hidden");
                document.getElementById("iconArrow" + id).classList.remove("ion-md-arrow-dropdown");
                document.getElementById("iconArrow" + id).classList.add("ion-md-arrow-dropright");
                document.getElementById("iconEdit" + id).classList.remove("active");
                document.getElementById("iconEdit" + id).classList.add("hidden");
            }
            if (!isActive) {
                //open active carousel item
                document.getElementById("item" + id).classList.remove("hidden");
                document.getElementById("item" + id).classList.add("active");
                document.getElementById("iconArrow" + id).classList.remove("ion-md-arrow-dropright");
                document.getElementById("iconArrow" + id).classList.add("ion-md-arrow-dropdown");
                document.getElementById("iconEdit" + id).classList.remove("hidden");
                document.getElementById("iconEdit" + id).classList.add("active");
            }
        }
    }

    editAccommodationPage(accommodation) {
        console.log("editAccommodation", accommodation);
        this.navCtrl.push(EditAccommodationPage, {accommodation: accommodation});
    }

    editAccommodationUserPage(accommodation, user) {
        console.log("editAccommodationUser", accommodation, user);

        this.navCtrl.push(EditAccommodationUserPage, {
            accommodation: accommodation,
            user: user,
            from: 'accommodations-list'
        });
    }

//     editAccommodationAppointmentPage(accommodation){
//     console.log("editAccommodationAppointmentsPage", accommodation);
//     }
}
