// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component, ViewChild, Input, ApplicationRef } from '@angular/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import 'rxjs/add/operator/map';
import { LoadingProvider } from '../../providers/loading/loading';
import { InfiniteScroll } from 'ionic-angular';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'sliding-tabs',
  templateUrl: 'sliding-tabs.html',
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
})
export class SlidingTabsComponent {
  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;
  image = [
    "assets/car-car-cleaning-icon-1.jpg",
    "assets/home-cleaning-icon-1.png",
    "assets/laundry-cleaning-1.png",
    "assets/organic-cleaning-icon-2.png",
    "assets/home-cleaning-icon-1.png",
    "assets/toilet-cleaning-image-3.jpg",
    "assets/water-treatment-chemical-1.png",
    
  ];
  
  @Input('type') type;//product data
  products: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  selected = '';
  page = 1;
  count = 0;
  loadingServerData = false;
  constructor(
    public shared: SharedDataProvider,
    public http: Http,
    public config: ConfigProvider,
    public loading: LoadingProvider,
    private applicationRef: ApplicationRef
  ) {

  }
  getProducts(infiniteScroll) {
    if (this.loadingServerData) return 0;
    if (this.page == 1) {

      this.count++;
      this.loadingServerData = false;
    }
    this.loadingServerData = true;
    let query = 'products?' + 'page=' + this.page;
    if (this.selected != '')
      query = 'products?category=' + this.selected + '&page=' + this.page;
    query = query + "&status=publish" + "&" + this.config.productsArguments
    console.log(query);
    this.config.Woocommerce.getAsync(query).then((data) => {
      console.log(data);

      let dat = JSON.parse(data.body);

      this.infinite.complete();
      if (this.page == 1) {
        this.products = new Array;

      }
      if (dat.length != 0) {
        this.page++;
        for (let value of dat) {
          this.products.push(value);
        }
      }
      if (dat.length == 0) { this.infinite.enable(false); }
      this.loadingServerData = false;
      this.applicationRef.tick();
      console.log(dat);
    });
  }

  //changing tab
  changeTab(c) {
    this.infinite.enable(true);
    this.page = 1;
    if (c == '') this.selected = c
    else this.selected = c.id;
    this.getProducts(null);
    this.loading.autoHide(700);
  }


  ngOnInit() {
    this.getProducts(null);
  }

}
