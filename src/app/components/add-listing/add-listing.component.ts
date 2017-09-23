import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../serveces/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  title = 'titleList';
  owner = 'ownerList';
  city = 'cityList';
  bedrooms = 13;
  price = 500;
  type = 'Estate';
  image;

  constructor(
    private firebaseService:FirebaseService
    ,private router:Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
    console.log('add-listing > ')
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type
    }

    this.firebaseService.addListing(listing);

    // this.router.navigate(['listings']);
  }

}
