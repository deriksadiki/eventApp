import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { User } from '../../Modals/User';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { MoreInfoPage } from '../more-info/more-info';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  Users = {} as User;
  event = this.navParams.get('event');
  action =   this.navParams.get('action2')
  constructor(private firebaseService: FirebaseConnectionProvider,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log(this.event);
  }

  back(){
    this.navCtrl.push(LoginPage)
  }

  
  reg(){

    if(this.Users.email == undefined && this.Users.password == undefined && this.Users.Username == undefined){
      const alert = this.alertCtrl.create({
        title: 'Error,',
        subTitle: ' Please provide your full details to register!',
        buttons: ['OK']
      });
      alert.present();
    }

    else if(this.Users.Username == undefined){

      const alert = this.alertCtrl.create({
        title: 'Error,',
        subTitle: 'Please enter a Username, it cannot be left empty',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.Users.email ==undefined){
      const alert = this.alertCtrl.create({
        title: 'Error,',
        subTitle: 'Please enter a valid email',
        buttons: ['OK']
      });
      alert.present();
    }


    else if(this.Users.password == undefined){

      const alert = this.alertCtrl.create({
        title: 'Error,',
        subTitle: 'Please enter a password, it cannot be left empty',
        buttons: ['OK']
      });
      alert.present();
    }


    else {
      this.firebaseService.registerUser(this.Users.email,this.Users.password,this.Users.Username).then(() =>{
        this.navCtrl.push(MoreInfoPage,{events:this.event, action:this.action});

       })

    }
  }

}
