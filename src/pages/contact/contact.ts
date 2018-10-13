import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { ProfileUpdatePage } from '../profile-update/profile-update';
import { PopoverController } from 'ionic-angular';
import { MyPopOverPage } from '../my-pop-over/my-pop-over'
import { PopoverComponent } from '../../components/popover/popover';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  profile = [];

  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController,private firebaseService: FirebaseConnectionProvider, private alertCtrl : AlertController,public modalCtrl:ModalController) {

  }

  ionViewDidLoad(){
    this.firebaseService.getProfile().then((data:any)=>{
      this.profile = data;
    })
  }

  presentModal(){
    const modal =this.modalCtrl.create(ProfileUpdatePage);
    modal.present();
  }

  presentPopover(event) {
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
       ev:event
    });
   
  }
 


}
