import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { CardSettingsPage } from '../card-settings/card-settings'


@Component({
  selector: 'page-add-card-modal',
  templateUrl: 'add-card-modal.html',
})
export class AddCardModalPage {

	item: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public platform: Platform,
              private stripe: Stripe) {
    this.item = {
      'card': 'bleh'
    };

    // IMPORT publishable key
    // I should really be doing this as an environment variable
    // But I'm low on caffiene and I honestly don't care. Its a hackathon
    this.stripe.setPublishableKey('pk_test_UxiExA5aDrBy7psUuOYrL1df');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardModalPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() { 
    // Stripe's own DummyData TM. Generates a nicely tokened credit card every time
    let card = {
     number: '4242424242424242',
     expMonth: 12,
     expYear: 2020,
     cvc: '220'
    };
    this.stripe.createCardToken(card)
       .then(token => {
         console.log(token);
         // TO DO: Store the token in db. But 48 hours and 1 developer to do the entire thing including UI is ridiculous
         this.navCtrl.push(CardSettingsPage);
       })
       .catch(error => console.error(error));
  }
}
