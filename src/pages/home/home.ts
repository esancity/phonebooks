import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { CallNumber } from '@ionic-native/call-number';
import { ItemDetailsPage } from '../../pages/item-details/item-details';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  personItems: FirebaseListObservable<any[]>;
  newItem = '';
  members: Array<any>;
  loader: any;
  public filteritems : any = [];
////////////////////
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:firebase.database.Reference;

  constructor(public navCtrl: NavController,
    public navParams:NavParams, 
    public loadingCtrl:LoadingController,
    private callNumber: CallNumber,
    public alertCtrl: AlertController,
    public firebaseProvider: FirebaseProvider
  ) {
      //this.personItems = this.firebaseProvider.getPersonItems();

      this.countryRef = firebase.database().ref('/person');
      
          this.countryRef.on('value', countryList => {
            let countries = [];
            countryList.forEach( country => {
              countries.push(country.val());
              return false;
            });
      
            this.countryList = countries;
            this.loadedCountryList = countries;
          });

  }

  addItem() {
    this.firebaseProvider.addItem(this.newItem);
  }
 
  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }

  initializeItems(){
    //this.personItems = this.firebaseProvider.getPersonItems();
    this.countryList = this.loadedCountryList;
  }


      //เลื่อนลง refresh
  doRefresh(refresher) {
    this.presentLoading();
      this.personItems = this.firebaseProvider.getPersonItems();
    this.loader.dismiss();
  }

  Viewperson(id)
  {
      this.navCtrl.push(ItemDetailsPage,{
        member:id
      });
  }

  presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        this.loader.present();
  }

  launchDialer(n:string){
        this.callNumber.callNumber(n, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
  }
  
  showConfirm(n:string) {
    let confirm = this.alertCtrl.create({
      title: "'ยืนยันการโทร!..." ,
      //message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Call',
          handler: () => {
            //console.log('Agree clicked');
            this.callNumber.callNumber(n, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        }
      ]
    });
    confirm.present();
  }

  //////////////////////////////////////////

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.countryList = this.countryList.filter((v) => {
      if(v.fullname && q) {
        if (v.fullname.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.countryList.length);

  }



}
