import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { AddCardModalPage } from '../add-card-modal/add-card-modal'

import { DynamoDB, User } from '../../providers/providers';

declare var AWS: any;

 export class UserDetails {
    username: string;
    email: string;
    password: string;
}

@Component({
  selector: 'page-bank-details',
  templateUrl: 'bank-details.html',
})
export class BankDetailsPage {

	// DUMMY DATA. Card info are sensitive and we don't have time or manpower to
	// figure it out
	public card_type : string = "MasterCard"
	public card_num : string = "**** **** **** 9999"
	public expiry_date : string;
	public userDetails: UserDetails;

	error: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
				public loadingCtrl: LoadingController, public user: User, 
				public db: DynamoDB, public modalCtrl: ModalController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BankDetailsPage');
	}

  addCard() {
      let addModal = this.modalCtrl.create(AddCardModalPage);
      addModal.onDidDismiss(item => {
      })
      addModal.present();
    }

}
