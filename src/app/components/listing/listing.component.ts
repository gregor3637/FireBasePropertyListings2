import * as firebase from 'firebase';

import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../serveces/firebase.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id: any;
  listing;
  imageUrl;

  constructor(
    private firebaseService: FirebaseService
    , private router: Router
    , private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getListingsDetails(this.id)
      .subscribe((listing) => {
        this.listing = listing.val();
        let storageRef = firebase.storage().ref();

        storageRef.child(listing.toJSON().path).getDownloadURL()
          .then(url => {
            console.log('#listing > > ngOnInit() > downloading image');
            this.imageUrl = url;
          },(err) => {
            console.log('#listing > ngOnInit() > Err');
            console.log(err);
          }).catch(err => {
            console.log('#listing > ngOnInit() > catch Err');
            console.log(err);
          })
      });
  }

  onDeleteClick() {
    this.firebaseService.deleteListing(this.id);

    this.router.navigate(['/listings']);
  }

}
