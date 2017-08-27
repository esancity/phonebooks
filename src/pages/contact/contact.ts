import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { TodosProvider } from '../../providers/todos/todos';
import { PageDetailsPage } from "../../pages/page-details/page-details";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  todos: any;
  loader: any;
  public filteritems : any = [];

  constructor(public navCtrl: NavController, 
    public loadingCtrl:LoadingController,
    private callNumber: CallNumber,
    public todoService: TodosProvider, 
    public alertCtrl: AlertController) {

  }

  // ionViewDidLoad(){
    
  //      this.todoService.getTodos().then((data) => {
  //        this.todos = data;
  //      });
    
  //    }

  
     createTodo(){
      
         let prompt = this.alertCtrl.create({
           title: 'Add',
           message: 'What do you need to do?',
           inputs: [
             {
               name: 'title'
             }
           ],
           buttons: [
             {
               text: 'Cancel'
             },
             {
               text: 'Save',
               handler: data => {
                 this.todoService.createTodo({title: data.title});
               }
             }
           ]
         });
      
         prompt.present();
      
       }
      
       updateTodo(todo){
      
         let prompt = this.alertCtrl.create({
           title: 'Edit',
           message: 'Change your mind?',
           inputs: [
             {
               name: 'title'
             }
           ],
           buttons: [
             {
               text: 'Cancel'
             },
             {
               text: 'Save',
               handler: data => {
                 this.todoService.updateTodo({
                   _id: todo._id,
                   _rev: todo._rev,
                   title: data.title
                 });
               }
             }
           ]
         });
      
         prompt.present();
       }
      
       deleteTodo(todo){
         this.todoService.deleteTodo(todo);
       }
 
       
       Viewperson(id)
       {
           this.navCtrl.push(PageDetailsPage,{
             member:id
           });
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
