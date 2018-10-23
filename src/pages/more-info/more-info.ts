import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { AboutPage } from '../about/about';
import {uploadEvent} from '../../Modals/Upload'

@IonicPage()
@Component({
  selector: 'page-more-info',
  templateUrl: 'more-info.html',
})
export class MoreInfoPage {
event = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private firebaseService: FirebaseConnectionProvider, private toastCtrl: ToastController) {
  }

ionViewDidLoad() {
  this.event.push(this.navParams.get('events'))
  console.log(this.event )
  }



  goings(){
   this.firebaseService.Goings(this.event[0].eventName,this.event[0].desc,this.event[0].start,this.event[0].end,this.event[0].date,this.event[0].location,this.event[0].img,this.event[0].amount)
   const toast = this.toastCtrl.create({
    message: 'Event of your choice has been added to your calender',
    duration: 3000
  });
  toast.present();
  }



}
