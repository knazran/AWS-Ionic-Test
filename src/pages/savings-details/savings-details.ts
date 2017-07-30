import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SavingsDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-savings-details',
  templateUrl: 'savings-details.html',
})
export class SavingsDetailsPage {

	transc : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
  	this.transc = this.navParams.get("transc");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavingsDetailsPage');
  }

}
