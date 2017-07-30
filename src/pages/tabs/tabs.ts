import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { TasksPage } from '../tasks/tasks';
import { InvestPage } from '../invest/invest';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TasksPage;
  tab2Root = InvestPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
