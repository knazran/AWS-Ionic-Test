import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { AddCardModalPage } from '../add-card-modal/add-card-modal'

import { DynamoDB, User } from '../../providers/providers';

/**
 * Generated class for the BankDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var AWS: any;

 export class UserDetails {
    username: string;
    email: string;
    password: string;
}

@IonicPage()
@Component({
  selector: 'page-bank-details',
  templateUrl: 'bank-details.html',
})
export class BankDetailsPage {

	public card_type : string = "MasterCard"
	public card_num : string = "**** **** **** 9999"
	public expiry_date : string;
	public userDetails: UserDetails;
	private taskTable: string = 'ionic-mobile-hub-tasks';

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
        if (item) {
          item.userId = AWS.config.credentials.identityId;
          item.created = (new Date().getTime() / 1000);
          this.db.getDocumentClient().put({
            'TableName': this.taskTable,
            'Item': item
          });
        }
      })
      addModal.present();
    }

}
