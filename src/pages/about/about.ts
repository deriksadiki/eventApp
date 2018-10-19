
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../Modals/User';
import { MoreInfoPage } from '../more-info/more-info';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { HomePage } from '../home/home';

@Component({
 selector: 'page-about',
 templateUrl: 'about.html'
})
export class AboutPage {
fetching = new Array();
eve = new Array();
message;
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
​ionViewDidEnter(){
  this.ionView();
}
​
 ionView() {
  this.message = "";
  this.fetching.length = 0;
  this.firebaseService.getALlGoings().then((data:any) => {
    console.log(data)
   if ( data == "no data"){
    this.message = "you do not have any event on your calendar";
   }
   else{
    this.fetching = data;
   }
  }, Error =>{
   console.log(Error)
  });
  }
  moreinfo(i){
   this.navCtrl.push(MoreInfoPage, {events:i, color:true});
  }
}