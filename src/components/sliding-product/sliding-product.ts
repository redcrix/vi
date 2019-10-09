import { Component } from '@angular/core';

/**
 * Generated class for the SlidingProductComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sliding-product',
  templateUrl: 'sliding-product.html'
})
export class SlidingProductComponent {

  text: string;

  constructor() {
    console.log('Hello SlidingProductComponent Component');
    this.text = 'Hello World';
  }

}
