import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { CommentsPage } from '../pages/comments/comments';
 import { HomePage } from '../pages/home/home';
// import { MoreInfoPage } from '../pages/more-info/more-info';
import { ContactPage } from '../pages/contact/contact';
import { RegisterPage } from '../pages/register/register';
import {LoginPage} from '../pages/login/login';
import { MoreInfoPage } from '../pages/more-info/more-info';
import {FirebaseConnectionProvider} from '../providers/firebase-connection/firebase-connection'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

 public rootPage: any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, fire:FirebaseConnectionProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      fire.getUserSatate().then( data =>{
     if (data == 1){
      this.rootPage =  TabsPage;
      fire.getuser();
     }
     else{
       this.rootPage = LoginPage;
     }
      })

    });
  }
}