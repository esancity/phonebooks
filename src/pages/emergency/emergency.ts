import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmsProvider } from '../../providers/ems/ems';
/**
 * Generated class for the EmergencyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html',
})
export class EmergencyPage {
  todos: any;
  loader: any;
  public filteritems : any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public todoService: EmsProvider, 
    private callNumber: CallNumber,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyPage');
  }

     
  presentLoading() {
      this.loader = this.loadingCtrl.create({
          content: "Loading..."
      });
      this.loader.present();
  }

  showConfirm(n:string) {
  let confirm = this.alertCtrl.create({
  title: "ยืนยันการโทร!..." ,
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


  ngOnInit()
  //load()
  {
    this.presentLoading();
    this.todoService.getTodos().then((data) => {
    this.todos = data;
    //console.log(data);
    this.loader.dismiss();
    this.initializeItems();       
  }

  );
  }

  initializeItems() {
    this.filteritems = this.todos;
  }

  getItems(ev: any) {
  // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filteritems = this.todos.filter((item) => {

    return (item.fullname.indexOf(val.toLowerCase()) > -1) 
      || (item.department.indexOf(val.toLowerCase()) > -1)
      || (item.position.indexOf(val.toLowerCase()) > -1)
      || (item.tel_position.indexOf(val.toLowerCase()) > -1)
      ;

    })
    } else{
      this.filteritems = [];
      this.initializeItems();
    }
  }



}
