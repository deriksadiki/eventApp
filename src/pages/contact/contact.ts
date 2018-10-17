import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { ProfileUpdatePage } from '../profile-update/profile-update';
import { PopoverController } from 'ionic-angular';

// import { PopoverComponent } from '../../components/popover/popover';
import { MoreInfoPage } from '../more-info/more-info';
import { PopOver2Component } from '../../components/pop-over2/pop-over2';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  profile = [];

  fetching = new Array();

  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController,private firebaseService: FirebaseConnectionProvider, private alertCtrl : AlertController,public modalCtrl:ModalController) {



  }

  ionViewDidLoad(){
    this.firebaseService.getProfile().then((data:any)=>{
      this.profile = data;
      console.log(this.profile)
    })
    this.fetching.length = 0;
    this.firebaseService.getALlGoings().then((data:any) => {
     this.fetching = data;
     console.log(data);
    }, Error =>{
     console.log(Error)

    });
  }

  presentModal(){
    const modal =this.modalCtrl.create(ProfileUpdatePage);
    modal.present();
  }


  Log(event) {
    const popover = this.popoverCtrl.create(PopOver2Component);
    popover.present({
       ev:event
    });
   
  }
 Update(){
   this.navCtrl.push(ProfileUpdatePage);
 }
  more(a){
    this.navCtrl.push(MoreInfoPage, {events:this.fetching[a], color:true});
  }

}
