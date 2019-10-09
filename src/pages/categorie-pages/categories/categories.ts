// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { SharedDataProvider } from '../../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../../providers/config/config';
import { SubCategoriesPage } from '../sub-categories/sub-categories';
import { trigger, style, animate, transition } from '@angular/animations';
import { CartPage } from '../../cart/cart';
import { SearchPage } from '../../search/search';
import { ProductsPage } from '../../products/products';


@Component({
  selector: 'page-categories',
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('700ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public events: Events,
  ) {

  }
  openSubCategories(parent) {
    console.log('1 ' + parent);
    let count = 0;
    console.log("all categories " + this.shared.allCategories)
    for (let val of this.shared.allCategories) {
      if (val.parent == parent) {
        count++;
        console.log(val.parent + "   " + parent);
      }
    }
    if (count == 0){
      console.log('if part ' + this.navCtrl);
      this.navCtrl.push(ProductsPage, { id: parent, name: "", sortOrder: 'newest' });
    }else{
      console.log('else part ' + this.navCtrl);
      this.navCtrl.push(SubCategoriesPage, { 'parent': parent });
    }
  }
  openCart() {
    this.navCtrl.push(CartPage);
  }
  openSearch() {
    this.navCtrl.push(SearchPage);
  }
  ionViewWillEnter() {
    if (this.config.admob == 1) this.shared.showAd();
  }
  ionViewDidEnter() {
    this.events.publish('footerChange', 'CategoriesPage');
  }
}
