import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { PageDetailsPage } from "../pages/page-details/page-details";
import { EmergencyPage } from "../pages/emergency/emergency";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { AngularFireModule } from 'angularfire2';
//import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { TodosProvider } from '../providers/todos/todos';
import { EmsProvider } from '../providers/ems/ems';

export const firebaseConfig = {
  apiKey: "AIzaSyBWhI0DeDl7HE3Aw5WSfHIauqIM-EHgg8k",
  authDomain: "phonebooks-3b0f9.firebaseapp.com",
  databaseURL: "https://phonebooks-3b0f9.firebaseio.com",
  projectId: "phonebooks-3b0f9",
  storageBucket: "phonebooks-3b0f9.appspot.com",
  messagingSenderId: "303237841455"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemDetailsPage,
    PageDetailsPage,
    EmergencyPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    //AngularFireOfflineModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ItemDetailsPage,
    PageDetailsPage,
    EmergencyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    TodosProvider,
    EmsProvider
  ]
})
export class AppModule {}
