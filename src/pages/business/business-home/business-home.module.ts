import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessHomePage } from './business-home';

@NgModule({
  declarations: [
    BusinessHomePage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessHomePage),
  ],
})
export class BusinessHomePageModule {}
