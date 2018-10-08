import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../Modals/User';
import { MoreInfoPage } from '../more-info/more-info';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  // moreinfo=function() {
  //   const modal = this.modalCtrl.create(MoreInfoPage);
  //   modal.present();
  // }

  // Users = {} as User;

}
