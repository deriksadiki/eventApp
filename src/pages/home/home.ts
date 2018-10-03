import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { MoreInfoPage } from '../more-info/more-info';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }
  moreinfo=function() {
    const modal = this.modalCtrl.create(MoreInfoPage);
    modal.present();
  }
}
