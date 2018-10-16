import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, NavController, NavParams, ViewController ,PopoverController} from 'ionic-angular';
import { Update } from '../../Modals/userUpdate';
=======
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
>>>>>>> 97bd24bb548dc3d9363356b26305d0f959ca24ef
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

<<<<<<< HEAD
  update = {} as Update
  profile = [];
   pic;
  constructor(public popoverCtrl: PopoverController,private fire: FirebaseConnectionProvider,public navCtrl: NavController,private firebaseService: FirebaseConnectionProvider, public navParams: NavParams,public viewCtrl: ViewController) {
=======
  Users = {} as User;
  pic;

  profile = [];

  constructor(private fire: FirebaseConnectionProvider,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
   
>>>>>>> 97bd24bb548dc3d9363356b26305d0f959ca24ef
  }

  ionViewDidLoad() {
    this.firebaseService.getProfile().then((data:any)=>{
      this.profile = data;
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

<<<<<<< HEAD
 
=======
>>>>>>> 97bd24bb548dc3d9363356b26305d0f959ca24ef

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
