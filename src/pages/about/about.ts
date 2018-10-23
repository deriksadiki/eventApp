
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseConnectionProvider) {

  }

  // moreinfo=function() {
  //   const modal = this.modalCtrl.create(MoreInfoPage);
  //   modal.present();
  // }

  // Users = {} as User;


  ionViewDidLoad() {
    var user = this.navParams.get('user');
    this.fetching.length = 0;
    this.firebaseService.getALlGoings().then((data:any) => {
      this.fetching = data;
      console.log(data);
    });
    }
    moreinfo(i){
      this.navCtrl.push(MoreInfoPage, {events:i});
    }
}
=======
message;
 constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseConnectionProvider) {
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
  this.ionViewDidLoad();
}
​
ionViewDidLoad() {
  this.message = "";
  this.fetching.length = 0;
  this.message = "you must Sign in first before you can view your calendar";
  this.firebaseService.getUserSatate().then( data =>{
    if (data == 1){
      this.message = "you do not have any events on your calendar";
      this.firebaseService.getALlGoings().then((data2:any) => {
        console.log(data)
       if ( data2 == "no data"){
        this.message = "you do not have any events on your calendar";
       }
       else{
        this.fetching = data2;
        this.message = "";
       }
      }, Error =>{
       console.log(Error)
      });
    }
     else if(data == 0){
      this.message = "Sign in first To view  your calendar";
     } 
  })

  }
  moreinfo(i){
   this.navCtrl.push(MoreInfoPage, {events:i, color:true});
  }
}
>>>>>>> 3fcffc746fe85daea04cba8d109d190268a372c6
