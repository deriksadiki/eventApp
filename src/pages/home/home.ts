import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { MoreInfoPage } from '../more-info/more-info';

import { NavController, AlertController } from 'ionic-angular';
import { User } from '../../Modals/User';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,private firebaseService: FirebaseConnectionProvider , public modalCtrl: ModalController){

  }

  moreinfo=function() {
    const modal = this.modalCtrl.create(MoreInfoPage);
    modal.present();
  }
=======
  Users = {} as User;



  // reg(){
  //   if(this.Users.email == undefined && this.Users.password && this.Users.userName == undefined){
  //     const alert = this.alertCtrl.create({
  //       title: 'Warning',
  //       subTitle: ' Please provide your full details to register!',
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //   }
  //   else if(this.Users.email ==undefined){
  //     const alert = this.alertCtrl.create({
  //       title: 'Wearning',
  //       subTitle: 'Please enter a valid email',
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //   }
  //   else if(this.Users.password == undefined){
  //     const alert = this.alertCtrl.create({
  //       title: 'Wearning',
  //       subTitle: 'Please enter a password, it cannot be left empty',
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //   }
  //   else if(this.Users.userName == undefined){
  //     const alert = this.alertCtrl.create({
  //       title: 'Wearning',
  //       subTitle: 'Please enter a Username, it cannot be left empty',
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //   }

  //   else {
  //     this.firebaseService.registerUser(this.Users.email,this.Users.password,this.Users.userName).then(() =>{
  //       const alert = this.alertCtrl.create({
  //         title: 'Welcome',
  //         subTitle: 'You have successfully Registared',
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //      })
  //   }
  // }


}
