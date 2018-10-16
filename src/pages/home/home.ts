import { Component } from '@angular/core';
import { MoreInfoPage } from '../more-info/more-info';
import { NavController, AlertController, NavParams} from 'ionic-angular';
import { User } from '../../Modals/User';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { LoginPage } from '../login/login';
import {BusinessHomePage} from '../business/business-home/business-home'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fetching = [];
  fetching2 = [];
  fetching3 = [];
  fetching4 = [];
  fetching5 = [];
  fetching6 = [];

  Users = {} as User;
  plus;
  constructor(public navCtrl: NavController,public navParams: NavParams ,public alertCtrl:AlertController,private firebaseService: FirebaseConnectionProvider){

  }
  ionViewDidLoad() {
    this.fetching.length = 0;
    var user = this.navParams.get('user');
    this.firebaseService.getAlldata().then((data:any) => {
      this.fetching = data;
      if (this.fetching[0] != undefined){
        this.fetching2.push(this.fetching[0])
      }
      if (this.fetching[1] != undefined){
        this.fetching3.push(this.fetching[1])
      }
      if (this.fetching[2] != undefined){
        this.fetching4.push(this.fetching[2])
      }
      if (this.fetching[3] != undefined){
        this.fetching5.push(this.fetching[3])
      }  
    });
     }


pager = [
  {color:"red"}
  
]

viewMore(i){
this.navCtrl.push(MoreInfoPage, {events:i});
}

  moreinfo(){
    this.navCtrl.push(MoreInfoPage);
  }

  logOut(){
    this.firebaseService.logout();
    this.navCtrl.push(LoginPage);
   }

   viewAll(){
     this.navCtrl.push(BusinessHomePage, {events:this.fetching})
   }

}