import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the ItemDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  person;
  constructor(public navCtrl: NavController, 
    private callNumber: CallNumber,
    public navParams: NavParams) {
      this.person = navParams.data.member;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }


  launchDialer(n:string){
    this.callNumber.callNumber(n, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  callphone() {
    this.callNumber.callNumber("0831257904", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

}
