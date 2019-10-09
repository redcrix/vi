import { Component } from '@angular/core';
import { NavController, NavParams, Events, ViewController } from 'ionic-angular';

declare var ScratchCard;
declare var SCRATCH_TYPE;
@Component({
  selector: 'page-scratch-card',
  templateUrl: 'scratch-card.html',
})
export class ScratchCardPage {
  data: any;
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams, private events: Events) {
    this.data = navParams.get("data");
  }

  ionViewDidLoad() {
    var _this = this;
    // window.addEventListener('load', function () {

    var html = '<div class="test">' + this.data.message + '<br>(code : <strong>' + this.data.code + ')</strong></div>'
    var scContainer = document.getElementById('js--sc--container');
    var sc = new ScratchCard('#js--sc--container', {
      enabledPercentUpdate: true,
      scratchType: SCRATCH_TYPE.CIRCLE,
      // brushSrc: './images/brush.png',
      containerWidth: scContainer.offsetWidth,
      containerHeight: scContainer.offsetHeight,
      imageForwardSrc: 'assets/scratchcard.png',
      imageBackgroundSrc: '',
      htmlBackground: html,
      clearZoneRadius: 25,
      percentToFinish: 25, // When the percent exceeds 50 on touchend event the callback will be exec.
      nPoints: 30,
      pointSize: 20,
      callback: function () {
        _this.events.publish('cardScratched', _this.data);
        console.log("Card is scratched");
        //_this.close();
      }
    })
    sc.init();

  }
  close() {
    this.viewCtrl.dismiss();
  }
}
