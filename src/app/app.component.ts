import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
<<<<<<< HEAD
import { LocalNotifications } from '@ionic-native/local-notifications';

import { RegisterPage } from '../pages/register/register';

import {LoginPage} from '../pages/login/login';

=======
import { CommentsPage } from '../pages/comments/comments';
>>>>>>> ee0991f7e951b65c4a34c6ee11dd8d4c1775d05f
// import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
// import { RegisterPage } from '../pages/register/register';
// import {LoginPage} from '../pages/login/login';
// import { MoreInfoPage } from '../pages/more-info/more-info';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
<<<<<<< HEAD
  rootPage:any = LoginPage ;
  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private localNotifications: LocalNotifications) {
=======

  rootPage:any = CommentsPage ;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
>>>>>>> ee0991f7e951b65c4a34c6ee11dd8d4c1775d05f
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  // sendNotivation(){

  // }
}
