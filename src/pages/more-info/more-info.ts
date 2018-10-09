import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { AboutPage } from '../about/about';
<<<<<<< HEAD
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';
=======
>>>>>>> 2e27efb047ffb00a40aa980510372b30d6fb5afb

@IonicPage()
@Component({
  selector: 'page-more-info',
  templateUrl: 'more-info.html',
})
export class MoreInfoPage {
event = new Array();
plus;
<<<<<<< HEAD
url =   '../../assets/imgs/Spring-Fi.jpg';
color='linear-gradient(rgba(0,0,0,0.0),rgba(0,0,0,20)),';
gatefee;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private firebaseService: FirebaseConnectionProvider,private launchNavigator: LaunchNavigator, private socialSharing: SocialSharing) {
=======
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private firebaseService: FirebaseConnectionProvider) {
>>>>>>> 2e27efb047ffb00a40aa980510372b30d6fb5afb
  }

ionViewDidLoad() {
  this.event.push(this.navParams.get('events'))
  console.log(this.event )
<<<<<<< HEAD
  this.url = this.event[0].img;
  this.gatefee = parseInt(this.event[0].fee ) + 100;
  }

  navigate = function(i){
    this.launchNavigator.navigate(i);
  }

  share(i){
  var location = 'at ' + this.event[0].location + ', this event was shared from event finder app, please download the app to get more information like this' 
    this.socialSharing.share(this.event[0].eventName,this.event[0].eventDesc,this.event[0].img, location ) .then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
=======
>>>>>>> 2e27efb047ffb00a40aa980510372b30d6fb5afb
  }

  going(){
    this.firebaseService.going(this.event[0].key,this.event[0].hostname,this.event[0].going )
  }
text(){
  console.log('text');
}
}
