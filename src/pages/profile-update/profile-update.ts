import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController ,PopoverController} from 'ionic-angular';
import { Update } from '../../Modals/userUpdate';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { User } from '../../Modals/User';

import { ContactPage } from '../contact/contact';




/**
 * Generated class for the ProfileUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
})
export class ProfileUpdatePage {

  update = {} as Update
  profile = [];
   pic;
   Users = {} as User;
  constructor(public popoverCtrl: PopoverController,private fire: FirebaseConnectionProvider,public navCtrl: NavController,private firebaseService: FirebaseConnectionProvider, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.firebaseService.getProfile().then((data:any)=>{
      this.profile = data;
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

 

  uploadPic(event:any){
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();
      reader.onload = (event:any) =>{
        this.pic = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveData(){
    this.fire.UpdateProfile(this.Users.Username,this.pic).then(data=>{
      console.log(data);

      this.navCtrl.push(ContactPage);


    })
  }
  // presentPopover(event) {
  //   const popover = this.popoverCtrl.create(PopOver2Component);
  //   popover.present({
  //      ev:event
  //   });
  // }
}
