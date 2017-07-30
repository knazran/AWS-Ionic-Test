import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ConfirmPage } from '../pages/confirm/confirm';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { BankDetailsPage } from '../pages/bank-details/bank-details';
import { AddCardModalPage } from '../pages/add-card-modal/add-card-modal';
import { InvestPage } from '../pages/invest/invest';
import { TabsPage } from '../pages/tabs/tabs';
import { SavingsMainPage } from '../pages/savings-main/savings-main';
import { SavingsDetailsPage } from '../pages/savings-details/savings-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../providers/user';
import { Cognito } from '../providers/aws.cognito';
import { DynamoDB } from '../providers/aws.dynamodb';
import { TranscDataProvider } from '../providers/transc-data/transc-data';
import {NgPipesModule} from 'ngx-pipes';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    ConfirmPage,
    SettingsPage,
    AboutPage,
    AccountPage,
    BankDetailsPage,
    AddCardModalPage,
    InvestPage,
    TabsPage,
    SavingsMainPage,
    SavingsDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NgPipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    ConfirmPage,
    SettingsPage,
    AboutPage,
    AccountPage,
    BankDetailsPage,
    AddCardModalPage,
    InvestPage,
    TabsPage,
    SavingsMainPage,
    SavingsDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    User,
    Cognito,
    DynamoDB,
    TranscDataProvider
  ]
})
export class AppModule {}

declare var AWS;
AWS.config.customUserAgent = AWS.config.customUserAgent + ' Ionic';
