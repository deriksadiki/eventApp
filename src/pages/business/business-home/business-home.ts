import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoreInfoPage} from '../../more-info/more-info'

/**
 * Generated class for the BusinessHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-home',
  templateUrl: 'business-home.html',
})
export class BusinessHomePage {

  events = this.navParams.get('events');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  viewMore(i){
    this.navCtrl.push(MoreInfoPage, {events:i});
    }
}
