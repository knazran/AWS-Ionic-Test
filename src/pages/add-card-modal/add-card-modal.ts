import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the AddCardModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-card-modal',
  templateUrl: 'add-card-modal.html',
})
export class AddCardModalPage {

	item: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public platform: Platform) {
    this.item = {
      'card': 'bleh'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardModalPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() { 
    this.viewCtrl.dismiss(this.item);
  }
}
