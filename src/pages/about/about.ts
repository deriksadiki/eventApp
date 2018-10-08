import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../Modals/User';
import { MoreInfoPage } from '../more-info/more-info';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
fetching = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseConnectionProvider) {

  }

  // moreinfo=function() {
  //   const modal = this.modalCtrl.create(MoreInfoPage);
  //   modal.present();
  // }

  // Users = {} as User;

}
