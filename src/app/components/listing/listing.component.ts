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
        console.log(this.listing);
      });
  }


}
