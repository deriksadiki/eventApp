import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
<<<<<<< HEAD
import { ViewPage } from '../view/view';
=======
import { LoginPage } from '../login/login';
>>>>>>> 7f1550802b05ff565ed1e487df4bdf578fd0458f

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
<<<<<<< HEAD
  tab3Root = ViewPage;

=======
  tab3Root = ContactPage;
  logg = LoginPage;
>>>>>>> 7f1550802b05ff565ed1e487df4bdf578fd0458f
  constructor() {

  }
}
