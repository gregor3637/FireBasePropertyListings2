import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../serveces/firebase.service';
import { element } from 'protractor';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  mapKeys = [];
  mapValues = [];

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
    console.log('Listings >> ngOnInit');
    this.fbService.getListings()
      .subscribe((rListings) => {
        console.log('***************Listings >> ngOnInit > onSubscribe');
        Object.keys(rListings).forEach(key => {
          var value = rListings[key];
          var keyName = value['$key'];
          this.mapKeys.push(keyName);
          this.mapValues.push(value);
          console.log(this.mapValues);
        });
      })
  }


  logTimes() {
    console.log('logTimes');
    return 55;
  }
}
