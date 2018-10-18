
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../Modals/User';
import { MoreInfoPage } from '../more-info/more-info';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { HomePage } from '../home/home';
​import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
 selector: 'page-about',
 templateUrl: 'about.html'
})
export class AboutPage {
fetching = new Array();
eve = new Array();
 constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseConnectionProvider) {
​
 }
​
 // moreinfo=function() {
 //  const modal = this.modalCtrl.create(MoreInfoPage);
 //  modal.present();
 // }
​
 // Users = {} as User;
​
​
 ionViewDidLoad() {

  this.fetching.length = 0;
  this.firebaseService.getALlGoings().then((data:any) => {
    if(data == null || data == undefined){
      alert("There are no events that you have selected!")
    }
    else{
      this.fetching = data;
    }
   console.log(data);
  }, Error =>{
   console.log(Error)
  });
  }
  moreinfo(i){
   this.navCtrl.push(MoreInfoPage, {events:i, color:true});
  }
}