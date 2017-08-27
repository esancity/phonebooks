import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import 'rxjs/add/operator/map';


/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public http: Http,
    public afd: AngularFireDatabase
  ) {
    console.log('Hello FirebaseProvider Provider');
  }

  getPersonItems() {
    return this.afd.list('/person/');
  }
 
  addItem(name) {
    this.afd.list('/person/').push(name);
  }
 
  removeItem(id) {
    this.afd.list('/person/').remove(id);
  }


}
