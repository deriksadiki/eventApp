import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, NavParams } from 'ionic-angular';
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
  temp = new Array();

  constructor(public navParams: NavParams, public popoverCtrl: PopoverController,public navCtrl: NavController,private firebaseService: FirebaseConnectionProvider, private alertCtrl : AlertController,public modalCtrl:ModalController) {
    this.profile.length = 0;
    this.fetching.length = 0;
  }

  ​ionViewDidEnter(){
this.profile.length = 0;
this.fetching.length = 0;
    this.ionViewDidLoad();
  }

  ionViewDidLoad(){
    console.log(this.navParams.get('proflie2'))
    console.log(this.profile)
    this.firebaseService.getProfile().then((data:any)=>{
      this.profile = data;
      this.temp = data;
    })
    this.firebaseService.getALlGoings().then((data:any) => {
      if (data != "no data"){
        this.fetching = data;
      }
     console.log(data);
    }, Error =>{
     console.log(Error)

    });
  }

  presentModal(){
    this.navCtrl.push(ProfileUpdatePage,{profile:this.profile});
  }


  Log(event) {
    const popover = this.popoverCtrl.create(PopOver2Component);
    popover.present({
       ev:event
    });
   
  }

   more(a){
    this.navCtrl.push(MoreInfoPage, {events:this.fetching[a], color:true});
  }

}
