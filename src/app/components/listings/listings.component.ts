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

  constructor(private fbService:FirebaseService) { }

  ngOnInit() {
    this.fbService.getListings()
      .subscribe((rListings)=> {
        // console.log('rlistings > ' + JSON.stringify(rListings));
        console.log('rListings[0] = ' + JSON.stringify(rListings.length))
        console.log('rListings[0] = ' + JSON.stringify(Object.keys(rListings[0])))
        console.log('rListings[0] = ' + JSON.stringify(rListings[0]["-Kdl_wRRkn7nJxgz4B54"]))


        Object.keys(rListings[0]).forEach(key => {
          this.mapKeys.push(key);
          var value = rListings[0][key];
          this.mapValues.push(value);
        });
          console.log(this.mapValues);
      })
  }

}
