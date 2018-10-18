import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, PopoverController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { AboutPage } from '../about/about';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {CommentsPage}  from '../comments/comments';
import { TabsPage } from '../tabs/tabs';
import { PopoverComponent } from '../../components/popover/popover';


@IonicPage()
@Component({
  selector: 'page-more-info',
  templateUrl: 'more-info.html',
})
export class MoreInfoPage {
event = new Array();
plus;
url =   '../../assets/imgs/Spring-Fi.jpg';
color='linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,20)),';
gatefee;
go;
buttonActive: boolean =  false;
color2 = "light"
pet;
colorState = "light";
state = this.navParams.get('color')

  constructor(public popoverCtrl: PopoverController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private view: ViewController,private toastCtrl: ToastController, private firebaseService: FirebaseConnectionProvider,private launchNavigator: LaunchNavigator, private socialSharing: SocialSharing) {
  }

ionViewDidLoad() {
  this.event.length = 0;
  this.event.push(this.navParams.get('events'))
  console.log(this.event )
  this.go =    this.event[0].going;
  this.url = this.event[0].img;
  this.gatefee = parseInt(this.event[0].fee ) + 100;
  // this.pet = 'kittens'
  this.firebaseService.getColourState(this.event[0].key).then(data =>{
    console.log(data)
    if (data == "found"){
      this.colorState = "danger";
    }
    else if (data == "not found"){
      this.colorState = "light";
    }
  })
  if (this.state == true){
    this.colorState = "danger";
  }
  console.log(this.colorState)
  }

  navigate = function(i){
    this.launchNavigator.navigate(i);
  }

  share(i){
  var location = 'at ' + this.event[0].location + ', this event was shared from event finder app, please download the app to get more events like this' 
    this.socialSharing.share(this.event[0].eventName,this.event[0].eventDesc,this.event[0].img, location ) .then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  going(){
    if (this.colorState == "danger"){
      this.firebaseService.removeFromFav(this.event[0].key).then(data =>{
        console.log(data);
        const toast = this.toastCtrl.create({
          message: 'The event has been removed from your calendar',
          duration: 3000
        });
        toast.present();
      }  , Error =>{
        console.log(Error.message)
      })
      this.colorState = "light";
    }
    else if (this.colorState == "light"){
      this.firebaseService.Goings(this.event[0].hostname,this.event[0].key)
      const toast = this.toastCtrl.create({
       message: 'The event has been added to your calendar',
       duration: 3000
     });
     toast.present();
      this.colorState = "danger";
    }
   
   }
  
  comment(){
  this.navCtrl.push(CommentsPage, {eventObject:this.event});
}
back(){
  this.navCtrl.pop();
}


logOut(){

  const confirm = this.alertCtrl.create({
    title: 'LOGGING OUT!',
    message: 'Are you sure you want to log out?',
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
          this.navCtrl.push(TabsPage);
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          this.firebaseService.logout();
        }
      }
    ]
  });
  confirm.present();
 
}

presentPopover(event) {
  const popover = this.popoverCtrl.create(PopoverComponent);
  popover.present({
     ev:event
  });
}
}

