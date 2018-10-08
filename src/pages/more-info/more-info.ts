import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-more-info',
  templateUrl: 'more-info.html',
})
export class MoreInfoPage {
fetching = [];
plus;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private firebaseService: FirebaseConnectionProvider) {
  }

ionViewDidLoad() {
var user = this.navParams.get('user');
this.firebaseService.getAlldata().then((data:any) =>{
  this.fetching = data;
   console.log(this.fetching);
 });
  }


  Terminate(){
    this.view.dismiss();
  }
  next(){
    if ("Going"){
      this.plus + 1
      this.navCtrl.push(AboutPage);
    }
  }
}
