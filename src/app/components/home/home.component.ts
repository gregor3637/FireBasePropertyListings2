import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../serveces/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
  }

  login() {
    this.firebaseService.login();
  }

}
