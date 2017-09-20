import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../serveces/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private fbService: FirebaseService,
    private fm: FlashMessagesService) { }

  ngOnInit() {
  }

  login() {
    this.fbService.login();
  }

  logout() {
    this.fm.show('You are logged out', { cssClass: 'alert-success', timeout: 3000 });
    this.fbService.logout();
  }
}
