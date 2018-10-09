import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { FirebaseConnectionProvider } from '../providers/firebase-connection/firebase-connection';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private firebaseService: FirebaseConnectionProvider) {
    
    if('Log-out')
    this.firebaseService.getUserState().then(data =>{
      if (data == 1){
        console.log("this user is logged in")
      }
      else if (data == 0){
        console.log("there is no logged in user")
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
