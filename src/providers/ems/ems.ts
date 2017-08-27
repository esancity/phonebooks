import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';

/*
  Generated class for the EmsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EmsProvider {
  data: any;
  db: any;
  remote: any;
  username: any;
  password: any;
  constructor(public http: Http) {
    //console.log('Hello EmsProvider Provider');
    this.db = new PouchDB('emergency');
    this.username = 'iesancity';
    this.password = 'ASDasd77';
     this.remote = 'http://123.242.182.81:5984/emergency';
  
     let options = {
       live: true,
       retry: true,
       continuous: true,
       auth: {
         username: this.username,
         password: this.password
       }
     };
  
     this.db.sync(this.remote, options);

  }


  getTodos() {
    
     if (this.data) {
       return Promise.resolve(this.data);
     }
    
     return new Promise(resolve => {
    
       this.db.allDocs({
    
         include_docs: true
    
       }).then((result) => {
    
         this.data = [];
    
         let docs = result.rows.map((row) => {
           this.data.push(row.doc);
         });
    
         resolve(this.data);
    
         this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
           this.handleChange(change);
         });
    
       }).catch((error) => {
    
         console.log(error);
    
       }); 
    
     });
    
   }

   handleChange(change){
    
     let changedDoc = null;
     let changedIndex = null;
    
     this.data.forEach((doc, index) => {
    
       if(doc._id === change.id){
         changedDoc = doc;
         changedIndex = index;
       }
    
     });
    
     //A document was deleted
     if(change.deleted){
       this.data.splice(changedIndex, 1);
     } 
     else {
    
       //A document was updated
       if(changedDoc){
         this.data[changedIndex] = change.doc;
       } 
    
       //A document was added
       else {
         this.data.push(change.doc); 
       }
    
     }
    
   }

  createTodo(todo){
    this.db.post(todo);
  }
   
  updateTodo(todo){
    this.db.put(todo).catch((err) => {
      console.log(err);
    });
  }
   
  deleteTodo(todo){
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }


}
