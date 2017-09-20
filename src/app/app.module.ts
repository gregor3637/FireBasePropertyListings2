import { RouterModule, Routes } from '@angular/router';

import { AddListingComponent } from "./components/add-listing/add-listing.component"
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { EditListingComponent } from "./components/edit-listing/edit-listing.component";
import { FirebaseService } from './serveces/firebase.service';
import { FlashMessagesModule } from 'angular2-flash-messages'
import { FormsModule } from '@angular/forms';
import { HomeComponent } from "./components/home/home.component";
import { HttpModule } from '@angular/http'
import { ListingComponent } from "./components/listing/listing.component";
import { ListingsComponent } from "./components/listings/listings.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgModule } from '@angular/core';
import { environment } from "../environments/environment";

const appRoutes:Routes = [
  {path: '', component: HomeComponent },
  {path: 'listings', component: ListingsComponent },
  {path: 'listing/:id', component: ListingComponent },
  {path: 'add-listing', component: AddListingComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FlashMessagesModule
  ],
  providers: [FirebaseService,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
