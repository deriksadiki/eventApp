import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Update } from '../../Modals/userUpdate';

import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { TabsPage } from '../tabs/tabs';
import { ContactPage } from '../contact/contact';


/**
 * Generated class for the ProfileUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {


  update = {} as Update
  getProfile = []
  profile;
  getUserProfile = this.navParams.get('profile');
  pic;
  constructor(public loadingCtrl:LoadingController,private fire: FirebaseConnectionProvider,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    

  }
  ionViewDidLoad() {
       this.pic =  this.getUserProfile[0].img;
       this.profile = this.getUserProfile[0].username;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  picInsert(event:any){
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();
      reader.onload = (event:any) =>{
        this.pic = event.target.result;

      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  saveData(){
    let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Please wait',
          duration: 17000
        });
        loading.present();
      this.fire.UpdateProfile(this.profile,this.pic).then((data:any)=>{
        setTimeout(() => {
          loading.dismiss();
          this.navCtrl.pop();
        }, 1500);

     })

    }

    // ImageCapture(){
    //   this.getProfile.length = 0;
    //   let loading = this.loadingCtrl.create({
    //     spinner: 'bubbles',
    //     content: 'Please wait',
    //     duration: 17000
    //   });
    //   loading.present();
    //   this.fire.uploadpic().then((data:any)=>{
    //     this.pic = data;
    //     this.getProfile.length = 0;
    //     this.fire.UpdateProfile(this.profile,this.pic).then(()=>{
    //       this.navCtrl.setRoot(TabsPage).then(()=>{
    //         this.navCtrl.push(ProfileUpdatePage)
    //         loading.dismiss();
    //       });
    //     })
    //   });
    //}

  // presentPopover(event) {
  //   const popover = this.popoverCtrl.create(PopOver2Component);
  //   popover.present({
  //      ev:event
  //   });
  // }
}

