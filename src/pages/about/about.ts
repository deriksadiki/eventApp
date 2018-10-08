import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
=======
import { NavController } from 'ionic-angular';
import { User } from '../../Modals/User';
import { MoreInfoPage } from '../more-info/more-info';

>>>>>>> 5d79c2fd63167817b4638843dd819e0b61e6c780

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
fetching = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseConnectionProvider) {

  }
<<<<<<< HEAD
ionViewDidLoad(){
  var user = this.navParams.get('user');
  this.firebaseService.getAlldata().then((data:any) => {
this.fetching = data;
console.log(this.fetching);
  });
}
=======

  // moreinfo=function() {
  //   const modal = this.modalCtrl.create(MoreInfoPage);
  //   modal.present();
  // }

  // Users = {} as User;

>>>>>>> 5d79c2fd63167817b4638843dd819e0b61e6c780
}
