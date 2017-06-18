import { Component , ViewChild} from '@angular/core';
import { Config, Platform, Events, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { TasksPage } from '../pages/tasks/tasks';
import { SettingsPage } from '../pages/settings/settings';

import { User } from '../providers/user';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = null;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Tasks', name: 'TabsPage', component: TabsPage, tabComponent: TasksPage, index: 0, icon: 'calendar' },
    { title: 'Settings', name: 'TabsPage', component: TabsPage, tabComponent: SettingsPage, index: 1, icon: 'contacts' }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, user: User, public config: Config,
              public menu: MenuController, public events: Events) {
    let globalActions = function() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    };

    platform.ready().then(() => {
      //Check if user has been authenticated, go to LoginPage if not
      user.isAuthenticated().then(() => {
        console.log('you are authenticated!');
        this.rootPage = TabsPage;
        globalActions();
      }).catch(() => {
        console.log('you are not authenticated..'); 
        this.rootPage = LoginPage;
        globalActions();
      });
    });
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    // Set the root of the nav with params if it's a tab index
  } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

}
