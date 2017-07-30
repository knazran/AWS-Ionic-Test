import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { SavingsMainPage } from '../savings-main/savings-main';
import { InvestPage } from '../invest/invest';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SavingsMainPage;
  tab2Root = InvestPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
