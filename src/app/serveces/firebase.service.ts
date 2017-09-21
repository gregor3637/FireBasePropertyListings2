import 'rxjs/add/observable/fromPromise';

import * as firebase from 'firebase/app';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class FirebaseService {

  user: Observable<firebase.User>;
  // user: Observable<firebase.User>;
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  getListings() {
    this.listings = this.db.list('listings') as FirebaseListObservable<Listing[]>;
    return this.listings;
  }

  login() {
    console.log('firebase.ts > login');
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    console.log('firebase.ts > logout');
    this.afAuth.auth.signOut();
  }

  isLoggedIn() {
    const user = firebase.auth().currentUser;
    let isLoggedIn: Boolean = false;
    if (user) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }

    return isLoggedIn;
  }

  getListingsDetails(id: any) {
    var refPath = '/listings/listings/' + id;
    var subscription = Observable.fromPromise(this.db.database.ref(refPath).once('value'));
    return subscription;
  }
}


interface Listing {
  key?: string;
  title?: string;
  type?: string;
  img?: string;
  city?: string;
  owner?: string;
  bedrooms?: string;
}