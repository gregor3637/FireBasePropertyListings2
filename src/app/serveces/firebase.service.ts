import 'rxjs/add/observable/fromPromise';

import * as firebase from 'firebase';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

// import * as firebase from 'firebase/app';



@Injectable()
export class FirebaseService {

  user: Observable<firebase.User>;
  // user: Observable<firebase.User>;
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  folder;

  constructor(
    private db: AngularFireDatabase
    , public afAuth: AngularFireAuth
    , private router: Router
    ) 
  {
    this.user = afAuth.authState;
    this.folder = 'listingimages';
    this.listings = this.db.list('listings') as FirebaseListObservable<Listing[]>;
  }

  getListings() {
    return this.listings;
  }

  login() {
    console.log('#firebase.ts > login()');
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    console.log('#firebase.ts > logout()');
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
    var refPath = '/listings/' + id;
    console.log('#firebase.ts > getListingsDetails() > refPath = ' + refPath)
    return Observable.fromPromise(this.db.database.ref(refPath).once('value'));
  }

  addListing(listing){
    console.log('#firebase.ts > addListing()');
    var storageRef = firebase.storage().ref();
    
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef =  storageRef.child(path);
      
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        this.router.navigate(['listings']);
        return this.listings.push(listing);
      });
    }
  }

  updateListing(id, listingData) {
    return this.listings.update(id, listingData);
  }

  deleteListing(id) {
    return this.listings.remove(id);
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