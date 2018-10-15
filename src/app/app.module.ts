import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {LaunchNavigator} from '@ionic-native/launch-navigator'
<<<<<<< HEAD
import { LocalNotifications } from '@ionic-native/local-notifications';
=======
import {LocalNotifications} from '@ionic-native/local-notifications'

>>>>>>> d724316a0628770b72789eb9e4c056895d92d40e

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseConnectionProvider } from '../providers/firebase-connection/firebase-connection';
import { BusinessHomePage } from '../pages/business/business-home/business-home';
import { RegisterBusinessPage } from '../pages/business/register-business/register-business';
import { ViewPage } from '../pages/view/view';

import { MoreInfoPage } from '../pages/more-info/more-info';
import { LoginPage } from '../pages/login/login';
import { CommentsPage } from '../pages/comments/comments';
import { RegisterPage } from '../pages/register/register'
import { ProfileUpdatePage } from '../pages/profile-update/profile-update';
import { MyPopOverPage } from '../pages/my-pop-over/my-pop-over';
import { PopoverComponent } from '../components/popover/popover';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BusinessHomePage,
    RegisterBusinessPage,
    MoreInfoPage,
    LoginPage,
    CommentsPage,
    RegisterPage,
<<<<<<< HEAD
    CommentsPage
=======
    CommentsPage,
    ProfileUpdatePage,
    MyPopOverPage,
    PopoverComponent
>>>>>>> d724316a0628770b72789eb9e4c056895d92d40e


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BusinessHomePage,
    RegisterBusinessPage,
    MoreInfoPage,
    LoginPage,
    CommentsPage,
    RegisterPage,
    ProfileUpdatePage,
    MyPopOverPage,
    PopoverComponent



  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseConnectionProvider,

    SocialSharing,
    LaunchNavigator,
    LocalNotifications
<<<<<<< HEAD
=======

>>>>>>> d724316a0628770b72789eb9e4c056895d92d40e
  ]
})
export class AppModule{}