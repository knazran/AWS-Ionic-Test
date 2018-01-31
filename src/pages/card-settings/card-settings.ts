import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-card-settings',
  templateUrl: 'card-settings.html',
})
export class CardSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardSettingsPage');
  }

  done(){
  	this.navCtrl.push(LoginPage);
  }

}
