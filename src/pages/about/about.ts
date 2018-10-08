import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
fetching = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseConnectionProvider) {

  }
ionViewDidLoad(){
  var user = this.navParams.get('user');
  this.firebaseService.getAlldata().then((data:any) => {
this.fetching = data;
console.log(this.fetching);
  });
}
}
