import { Component } from '@angular/core';
import {FirebaseConnectionProvider} from '../../providers/firebase-connection/firebase-connection'
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  logg = LoginPage;
  status;
  constructor(public fire:FirebaseConnectionProvider) {

  }
  ​ionViewDidEnter(){
    this.checkLogInState();
  }
  checkLogInState(){
    this.fire.getUserSatate().then( data =>{
      if (data == 1){
        console.log('online')
       this.status =  true;
       this.fire.getuser().then(data=>{
       });
      }
  
     else if(data == 0){
        console.log('offline')
        this.status =  false;
      }
       })
  }

  // checkLogInState(){
  //   this.fire.getUserSatate().then( data =>{
  //     if (data == 1){
  //       console.log('online')
  //       this.tab1Root = HomePage;
  //       this.tab2Root = AboutPage;
  //       this.tab3Root  = ContactPage;
  //      this.fire.getuser().then(data=>{
  //      });
  //     }
  
  //    else if(data == 0){
  //       console.log('offline')
  //       this.tab1Root = HomePage;
  //       this.tab2Root = AboutPage;
  //     }
  //      })
  // }
}
