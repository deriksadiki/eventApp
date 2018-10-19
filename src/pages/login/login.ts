import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FirebaseConnectionProvider } from '../../providers/firebase-connection/firebase-connection';
import {login} from '../../Modals/login';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import {RegisterBusinessPage} from '../business/register-business/register-business'
import { BusinessHomePage } from '../business/business-home/business-home';
<<<<<<< HEAD
import { CommentsPage } from '../comments/comments';
import { MoreInfoPage } from '../more-info/more-info';
=======
import { SecondPage } from '../second/second';

>>>>>>> 38a44b0e7dbc6ea6c8071fcf45a06fa5a7aaed32
// import { ScreenOrientation } from '@ionic-native/screen-orientation';



 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  logging = {} as login;
<<<<<<< HEAD
  event = this.navParams.get('event');
  action =   this.navParams.get('action')
=======

  splash = true;
  secomndPage = SecondPage;

>>>>>>> 38a44b0e7dbc6ea6c8071fcf45a06fa5a7aaed32
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseConnectionProvider, public alertCtrl:AlertController,public loadingCtrl:LoadingController) {

  }

  ionViewDidLoad() {
<<<<<<< HEAD
    console.log(this.event)
=======
    setTimeout(()=> this.splash = false , 3000);

>>>>>>> 38a44b0e7dbc6ea6c8071fcf45a06fa5a7aaed32
  }

  login(){
    if (this.logging.email == "Admin" && this.logging.password =="123456"){
        this.navCtrl.push(RegisterBusinessPage)
    } 
    else{
      this.firebaseService.login(this.logging.email,this.logging.password).then(()=>{
        this.firebaseService.getuser();
        if (this.action == "comment" || this.action == "navigate" || this.action == "share" || this.action == "going"){
          this.navCtrl.pop();
        }
      }, Error =>{
        if (this.logging.email == undefined && this.logging.password == undefined){
          const alert = this.alertCtrl.create({
            title: 'Warning!',
            subTitle: 'Please provide your log in details to log in!',
            buttons: ['Ok']
          });
          alert.present();
        }
        else if (this.logging.email == undefined){
          const alert = this.alertCtrl.create({
            title: 'Warning!',
            subTitle: 'Email cannot be left out!',
            buttons: ['Ok']
          });
          alert.present();
        }else if (this.logging.password == undefined ){
          const alert = this.alertCtrl.create({
            title: 'Warning!',
            subTitle: 'Password cannot be left out!',
            buttons: ['Ok']
          });
          alert.present();
        }
        else{
          const alert = this.alertCtrl.create({
            title: 'Warning!',
            message: Error,
            buttons: ['OK']
          });
          alert.present();
        }
      })
    }

  }

reg(){
  this.navCtrl.push(RegisterPage, {action2:this.action, event:this.event});
}


  ForgotPassword(){
    const prompt = this.alertCtrl.create({
      title: 'Enter Your Email',
      message: "A new password will be sent to your email",
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'you@example.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
  
            const loader = this.loadingCtrl.create({
              content: "Please wait.. resetting your password",
              duration: 2000
            });
            loader.present();
  
            this.firebaseService.forgotPassword(data.recoverEmail).then(() =>{
              // add toast
              loader.dismiss().then(() => {
              //show pop up
              let alert = this.alertCtrl.create({
              title: 'Check your email',
              subTitle: 'Password reset succesful',
              buttons: ['OK']
              });
                alert.present();
              })
            },error =>{ 
              loader.dismiss().then(() => {
              let alert = this.alertCtrl.create({
              title: 'Error resseting password',
              subTitle:error.message,
              buttons: ['OK']
              });
              alert.present();
            })
            });
          }
        }
      ]
    });
    prompt.present();
    }
}