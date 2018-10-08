import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseConnectionProvider } from '../providers/firebase-connection/firebase-connection';
import { BusinessHomePage } from '../pages/business/business-home/business-home';
import { RegisterBusinessPage } from '../pages/business/register-business/register-business';

import { MoreInfoPage } from '../pages/more-info/more-info';
import { LoginPage } from '../pages/login/login';
import { CommentsPage } from '../pages/comments/comments';

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
    CommentsPage

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
    CommentsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseConnectionProvider
  ]
})
export class AppModule {}
