import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { ProfileUpdatePage } from '../profile-update/profile-update';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  profile = [];

  constructor(public navCtrl: NavController,private firebaseService: FirebaseConnectionProvider, private alertCtrl : AlertController,public modalCtrl:ModalController) {
 
  }

  ionViewDidLoad(){
    this.firebaseService.getProfile().then((data:any)=>{
      this.profile = data;
    });

    this.firebaseService.getuser().then(data=>{
      console.log(data);
    });
  }

  presentModal(){
    const modal =this.modalCtrl.create(ProfileUpdatePage);
    modal.present();
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
            this.navCtrl.push(LoginPage)
          }
        }
      ]
    });
    confirm.present();
   
  }


}
