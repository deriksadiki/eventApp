import { Component } from '@angular/core';

/**
 * Generated class for the PopOver2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pop-over2',
  templateUrl: 'pop-over2.html'
})
export class PopOver2Component {

  text: string;

  constructor() {
    console.log('Hello PopOver2Component Component');
    this.text = 'Hello World';
  }

}
