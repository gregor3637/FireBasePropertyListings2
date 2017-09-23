import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../serveces/firebase.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id;
  title;
  owner;
  city;
  bedrooms
  price
  type;
  image;


  constructor(
    private firebaseService: FirebaseService
    , private router: Router
    , private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService
      .getListingsDetails(this.id)
      .subscribe((listing) => {
        var listingDataJSON = listing.toJSON();
        this.title = listingDataJSON.title;
        this.owner = listingDataJSON.owner;
        this.city = listingDataJSON.city;
        this.bedrooms = listingDataJSON.bedrooms;
        this.price = listingDataJSON.price;
        this.type = listingDataJSON.type;
      });
  }

  onEditSubmit() {
    let listingData = {
      title: this.title,
      owner: this.owner,
      city: this.city,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type
    }

    this.firebaseService.updateListing(this.id, listingData);
    this.router.navigate(['/listings'])
  }

}
